---
title: 'Version Support Matrix'
permalink: /guides/version-support-matrix/
group: versions
layout: post
color: blue
icon: fa fa-table
---

<!-- markdownlint-disable no-inline-html no-emphasis-as-heading -->

The following table shows which versions of the REST API are available for each
release of Metasys.

> **Note** The REST API is not supported on Metasys for Validated Environments
> (MVE) sites. Do not attempt to use the REST API on an MVE site.

<table style="text-align: center; width: 100%;">
  <thead>
    <tr>
      <th style="text-align: center;">API Version</th>
      <th style="text-align: center;">10</th>
      <th style="text-align: center;">10.1</th>
      <th style="text-align: center;">11</th>
      <th style="text-align: center;">12</th>
      <th style="text-align: center;">13</th>
      <th style="text-align: center;">14</th>
      <th style="text-align: center;">14.1</th>
      <th style="text-align: center;">15</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v1/' | relative_url }}">v1</a></strong></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v2/' | relative_url }}">v2</a></strong></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check'></i></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v3/' | relative_url }}">v3</a></strong></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check'></i></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v4' | relative_url }}">v4</a></strong></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check'></i></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v5' | relative_url }}">v5</a></strong></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check'></i></td>
      <td style="text-align: center;"><i class='fa fa-check'></i></td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v6' | relative_url }}">v6</a></strong></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
    </tr>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v6-14-1' | relative_url }}">v6 for 14.1</a></strong></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
    </tr>
    <tr>
      <td style="text-align: center;"><strong><a href="{{ '/api/v6-15' | relative_url }}">v6 for 15</a></strong></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"><i class='fa fa-check-circle'></i></td>
    </tr>
  </tbody>
</table>

<br>**Legend**<br>

- empty cell - API not available
- <i class='fa fa-check-circle'></i> - Supported
- <i class='fa fa-check'></i> - Deprecated (supported, but may be removed in a
  future release)

## Changelog

See the [API Changelog]({{ '/guides/api-changelog/' | relative_url }}) for a
full history of changes by API version.
