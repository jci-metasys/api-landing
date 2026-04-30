# Copilot Instructions

This is a Jekyll-based GitHub Pages documentation site for the Metasys® REST API.

## Repo structure

| Path | Purpose |
|---|---|
| `guides/*.markdown` | Jekyll Markdown pages (changelog, version matrix, quickstart, etc.) |
| `api/*.html` | Static ReDoc/Apiary HTML files — copied as-is by Jekyll, **do not review internals** |
| `assets/css/main.scss` | Custom SCSS overrides on top of the vendored theme |
| `_data/default/cards.yml` | Homepage card definitions |
| `_themes/` | Vendored Jekyll theme — **do not review theme internals** |
| `.github/workflows/pr-preview.yml` | PR preview deploy/cleanup workflow |
| `.github/workflows/deploy.yml` | Production deploy workflow |
| `Gemfile` / `Gemfile.lock` | Ruby/Jekyll dependencies |

## Build and validation

```bash
bundle exec jekyll build          # production build
bundle exec jekyll serve          # local dev (http://127.0.0.1:4000/api-landing/)
bundle exec markdownlint guides/  # lint Markdown
```

CI runs markdownlint and Jekyll build on every PR. A successful build with no errors
is required. Sass deprecation warnings from `_themes/` are expected and not actionable.

## Jekyll conventions

- **Internal links** must use Jekyll's `relative_url` filter:
  `{{ '/guides/some-page' | relative_url }}`. Never hardcode `/api-landing/...` paths.
- **`baseurl`** in production is `/api-landing/` (trailing slash required). Liquid's
  `prepend: site.baseurl` relies on this trailing slash for correct asset paths.
- **Page front matter** fields: `title`, `permalink`, `group`, `layout`, `color`, `icon`.
  `color` and `icon` are strings (`icon` is a Font Awesome class, e.g. `fa fa-list`).
- **`_data/default/cards.yml`** cards must have `title`, `intro`, `color`, `icon`, and
  `url`. Missing `icon` breaks the card layout.

## Content conventions

- Operation names cited inline as cross-references use `"double quotes"`
  (e.g. `"List activities"`). Bullet-list headings that name the operation being
  described are left unquoted.
- Changelog entries follow: Added / Changed / Deprecated / Removed / Fixed.
- `no-duplicate-heading` markdownlint rule is intentionally disabled in
  `guides/api-changelog.markdown` — changelog sections repeat heading names
  (e.g. `#### Added Operations`) across version blocks.
- PR titles follow Conventional Commits: `type: description` where type is one of
  `docs`, `ci`, `fix`, `style`, `chore`, `build`, `spec`.

## CI/workflow conventions

- `pr-preview.yml` uses a `preview_vars` step (`id: preview_vars`) to normalize
  `vars.JEKYLL_URL` and `vars.JEKYLL_BASEURL`. All URL construction downstream must use
  `steps.preview_vars.outputs.*` — never concatenate `vars.*` directly.
- `deploy.yml` uses a `deploy_vars` step (`id: deploy_vars`) for the same normalization
  on the production build.
- `${VAR:-default}` bash fallback is intentional: GitHub Actions exposes unset repo
  variables as empty strings, so `:-` (fallback on unset OR empty) is correct.
- `JEKYLL_URL` = scheme+host only, no trailing slash (e.g. `https://jci-metasys.github.io`).
- `JEKYLL_BASEURL` = subpath with leading slash, no trailing slash (e.g. `/api-landing`).
  Empty string (`""`) is valid for root-deployed sites.

## Review focus areas

- Correctness of `relative_url` usage in Markdown files
- Correct and complete front matter on new/modified pages
- Shell script correctness in workflow `run:` steps — quoting, `set -e`, edge cases
- Dependency changes in `Gemfile` — flag CVEs or security regressions
- Logic errors in GitHub Actions expressions and step ordering

## Known non-issues (do not flag)

- Sass `@import`, `lighten()`, `darken()`, `slash-div` deprecation warnings from `_themes/`
- Internal content of `api/*.html` spec files
- `bundler` CVEs in `_themes/*.gemspec` — vendored theme, requires theme update
