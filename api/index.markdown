---
title: API Versions
permalink: /api/
layout: post
color: blue
---

# API Versions

{% for version in site.data.default.api %}
- [{{ version.name }}]({{ version.url | prepend: site.baseurl }})
{% endfor %}

{% if site.pre_release %}

## Preview Versions

These versions are only hosted internally and are shown when a build in TeamCity is pinned. The list of pinned builds are then shown here with their respective build number and branch name.

<div class="version-container-pinned" markdown="1">
{:#version-link-template}
[~name~]({{ '/api/pre-release/?build=~buildId~' | relative_url }})
</div>

## PR Builds

<div class="version-container-pr" markdown="1">
{:#version-link-template}
[~name~]({{ '/api/pre-release/?build=~buildId~' | relative_url }})
</div>

{% endif %}