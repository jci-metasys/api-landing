# Metasys API Landing Page

[![CircleCI](https://circleci.com/gh/metasys-server/api-landing.svg?style=svg)](https://circleci.com/gh/metasys-server/api-landing)

<!-- cSpell:ignore apiaryio -->


The landing page for the [Metasys Server API Documentation](https://metasys-server.github.io/api-landing)

## Contributing

### Pull Requests

When a pull request is submitted, CircleCI will automagically generate a full site preview which can be shown to reviewers before merging in the changes.

The preview can be accessed via the "Artifacts" tab when viewing the build in CircleCI and clicking on the index.html file.

## Previewing Locally

The following steps need to be done once after cloning the repo

```bash
> git submodule init
> git submodule update --remote
> bundle install --path vendor/bundle # depending on your env, you may not need path parameter
```

Now to serve the site:

```bash
> bundle exec jekyll serve
```

Then in your browser open `http://127.0.0.1:4000/api-landing/`

If you want your browser to auto-reload while you make changes to the docs use the `--livereload` parameter:

```bash
> bundle exec jekyll serve --livereload
```

### Notes for Previewing on Apple Silicon

These instructions work using the built-in version of `ruby` which ships with macOS 12 (Monterey)

```bash
> which ruby
/usr/bin/ruby
> ruby -v
ruby 2.6.8p205 (2021-07-07 revision 67951) [universal.arm64e-darwin21]
>
```

The `bundle install` step above will typically fail when trying to install the `ffi` dependency. At the time of writing there is no `arm` version of that package. The trick is to run `ruby` in "intel" mode and install all the intel versions of the libraries:

```bash
arch -x86_64 bundle install --path vendor/bundle
```

Likewise, the `--livereload` switch fails when running the site in `arm` mode. Instead issue the command in "intel" mode.

```bash
arch -x86_64 bundle exec jekyll serve --livereload
```
