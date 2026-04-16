# Metasys API Landing Page

[![Deploy to GitHub Pages](https://github.com/jci-metasys/api-landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/jci-metasys/api-landing/actions/workflows/deploy.yml)

<!-- cSpell:ignore apiaryio automagically test -->

The landing page for the
[Metasys Server API Documentation](https://jci-metasys.github.io/api-landing)

## Contributing

### Pull Requests

When a pull request is opened or updated, a GitHub Actions workflow
automatically builds a full site preview and posts a comment on the PR with a
direct link to browse it. The comment updates as new commits are pushed, and
the preview is cleaned up when the PR is closed.

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

PR previews are built and deployed by the GitHub Actions workflow
`.github/workflows/pr-preview.yml`. Here is how it works:

1. When a PR is opened, updated, or reopened, the workflow posts a "building…"
   comment on the PR, then builds the Jekyll site with a config override that
   points the `url` and `baseurl` at the preview's subdirectory on the
   `gh-pages` branch.
2. A small JavaScript shim is appended to `_site/assets/js/main.js` to fix
   extension-less links (e.g. `/api/v6` → `/api/v6.html`). GitHub Pages
   handles these via content negotiation on the live site, but the static
   preview directory does not. **When a new API version file is added to
   `api/`, update the version list in this shim** (search for `v6-14-1` in
   `pr-preview.yml`).
3. The built site is pushed to the `gh-pages` branch under
   `pr-preview/pr-<number>/`.
4. The PR comment is updated with a direct link to the preview.
5. When the PR is closed or merged, the preview directory is removed from
   `gh-pages` and the comment is updated.

Preview URLs follow the pattern:
`https://jci-metasys.github.io/api-landing/pr-preview/pr-<number>/`

[guides]: https://jekyllrb.com/docs/installation/#guides
