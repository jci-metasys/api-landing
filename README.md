# Metasys API Landing Page

[![CircleCI](https://circleci.com/gh/jci-metasys/api-landing.svg?style=svg)](https://circleci.com/gh/jci-metasys/api-landing)

<!-- cSpell:ignore apiaryio automagically  -->

The landing page for the
[Metasys Server API Documentation](https://jci-metasys.github.io/api-landing)

## Contributing

### Pull Requests

When a pull request is submitted, CircleCI will automagically generate a full
site preview which can be shown to reviewers before merging in the changes.

The preview can be accessed via the "Artifacts" tab when viewing the build in
CircleCI and clicking on the `site-preview/index.html` file.

## Previewing Locally

### Prerequisites

This project depends on Ruby the language and Jekyll a static website generator.

Before attempting to preview locally you need to get your environment setup. The
steps that we'll go through are

- Install Ruby
- Install the ruby programs `bundler` and `jekyll`
- Setup git submodules to access the theme for this site.

#### Install Ruby

Install Ruby (This varies by operating system). I recommend the
[instructions][guides] at the Jekyll website for your operating system. I
recommend installing version 3.1.3 (at the time of writing as that is what it's
been tested with most lately).

#### Install Bundler and Jekyll

Install the programs `bundler` and `jekyll`.

```bash
gem install bundler:2.3.26 jekyll:3.9.3
```

Those specific versions are recommended as that's the version of Jekyll used by
GitHub Pages and that's the version of the bundler used to create the
Gemfile.lock file.

#### Setup Git Submodules

The following steps need to be done once after cloning the repo

```bash
> git submodule init
> git submodule update --remote
> bundle install --path vendor/bundle # depending on your env, you may not need path parameter
```

This only needs to be done once per working directory. So if for some reason you
were to clone this repository a second time to another location you would need
to repeat this step to setup that working directory.

Note the `--path` parameter. If you installed a version of `ruby` using a ruby
version manager then you probably don't need that path as all dependencies will
be installed in a non admin location. But it never hurts to include that path if
you are uncertain. This just tells `bundle` where to install dependencies. (Some
installations of Ruby store all dependencies in an admin area where you wouldn't
normally have write access.)

### Previewing the Site

Once the prerequisites are in place you can preview the site at any time:

```bash
> bundle exec jekyll serve
```

Then in your browser open `http://127.0.0.1:4000/api-landing/`

If you want your browser to auto-reload while you make changes to the docs use
the `--livereload` parameter:

```bash
> bundle exec jekyll serve --livereload
```

### Notes for Previewing on Apple Silicon

These instructions work using the built-in version of `ruby` which ships with
macOS 12 (Monterey)

```bash
> which ruby
/usr/bin/ruby
> ruby -v
ruby 2.6.8p205 (2021-07-07 revision 67951) [universal.arm64e-darwin21]
>
```

The `bundle install` step above will typically fail when trying to install the
`ffi` dependency. At the time of writing there is no `arm` version of that
package. The trick is to run `ruby` in "intel" mode and install all the intel
versions of the libraries:

```bash
arch -x86_64 bundle install --path vendor/bundle
```

Likewise, the `--livereload` switch fails when running the site in `arm` mode.
Instead issue the command in "intel" mode.

```bash
arch -x86_64 bundle exec jekyll serve --livereload
```

Note: I did not have issues with these dependencies when using Ruby 3.1.3 which
was installed using `install-ruby`.

## Documentation on PR Preview Builds

We use Circle CI for PR Preview Builds rather than GitHub Actions. This is
partially for legacy reasons (GitHub Actions didn't exist at the time this repo
was created). But it's also because GitHub doesn't have the type of artifacts we
want. With Circle CI we can up load the entire preview site as individual files.
With GitHub Actions the pre-built site is zipped up into a single downloadable
artifact&mdash;which makes it impossible to link to individual files.

Circle CI Builds are triggered every time a branch changes. But we only want the
build to run as part of a PR. At the time of writing PR triggers did not exist
on Circle CI. See [Circle CI Triggers Overview][triggers].

Our preview build is intended to help as part of a PR, so the build exits
immediately if it determines there is no PR associated with the branch.

We use a separate GitHub action that is triggered when a PR is opened or
reopened. It then uses the [Circle CI Pipeline Trigger API][pipeline] to run the
build.

When the Circle CI build runs, it immediately checks the PR for any previous
comments from itself. If none are found, then a new commit is added to the PR
that informs users that "Circle CI Preview is being generated" and includes a
link to the build. If a previous comment is found, then that commit is modified
to state that a "Circle CI Preview is being generated".

When the build is completed and the artifacts are uploaded, then the job looks
for it's previous commit and changes the body to say "Circle CI Preview
Available" with a link to the preview site.

[guides]: https://jekyllrb.com/docs/installation/#guides
[triggers]: https://circleci.com/docs/triggers-overview/

<!-- prettier-ignore -->
[pipeline]: https://circleci.com/docs/triggers-overview/#run-a-pipeline-using-the-api
