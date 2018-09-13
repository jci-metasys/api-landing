---
title: '<i class="metasys"></i> API'
page_title: 'Metasys&reg; API'
permalink: /api/
layout: post
color: blue
icon: far fa-file-alt
date: 2018-08-16
---

# Introduction

The <i class="metasys"></i> API is the exposed interface for accessing system data. This document defines the contracts included in that interface.

{% if site.pre_release %}
## Pre-Releases

You may access pre-release (internal only) versions from either the version dropdown in the top right or by visiting the [pre-releases page]({{ '/api/pre-release/' | relative_url }}).
These versions come from [pinned TeamCity builds](https://preteamcity.cg.na.jci.com/viewType.html?buildTypeId=MetasysG4_CoreServer_ApiDocumentation_Pr&tab=buildTypeStatusDiv&branch_MetasysG4_CoreServer_ApiDocumentation=__all_branches__) where rendered previews are also available and displayed upon selecting a pre-release version here.
{% endif %}

## Pagination

On endpoints where `page` and `pageSize` is allowed, the default `page` number will be 1 and is 1-based for all endpoints while the default `pageSize` will vary between endpoints.  The `page` parameter indicates the `page` number of items to return from the endpoint.  The `pageSize` parameter indicates the maximum number of items in the response from the endpoint.

Payloads returned by pagination-enabled endpoints will have a similar structure. A `total` property will indicate the total number of items included in all pages. A `next` and `previous` property will supply a link to the next and previous page of data, respectively (These properties can be empty if irrelevant, e.g. it is the first/last page, or there is only one page of data). The `items` property contains the data included in the page.

## Sorting Rules

On endpoints where a `sort` query parameter is allowed, the supplied value should be in the format of a single attribute name, optionally prefixed with `-` to indicate descending sort order (ascending order is used if no prefix is supplied).

## Relationship Links

Payloads may contain links to related data, each represented as a property sharing the name of the respective relationship. The links point to either single or multiple related entities. A link to a single entity points to the canonical endpoint for that entity. A link to multiple entities points to an endpoint dedicated to representing that particular relationship.

For example, if object `/objects/a` has children `/objects/b` and `/objects/c`, the payload returned by `/objects/a` will have a property `objects` with a value of `/objects/a/objects`, because multiple children can be returned. However, the payload returned by `/objects/b/` will contain a property 'parent' with a value of `/objects/a` (not `/objects/b/parent`), because the relationship represents a single entity.

Additionally, each payload will contain a `self` property, which contains a link representing the endpoint used to obtain the data contained in the current payload.

## Validation

There are some general rules that apply across all endpoints. If certain provided inputs are invalid or preconditions are not met, the API wll respond with an appropriate error to indicate what went wrong.

|Condition                      |Error             |Details                                                                                                    |
|-------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
|User not authenticated         |401 (Unauthorized)|The auth token supplied with the request is missing, invalid, or expired                                   |
|Record not authorized          |403 (Forbidden)   |The user is not authorized to view data matching the provided identifier                                   |
|Identifier not found           |404 (Not Found)   |An identifier is provided that does not match any known data                                               |
|Missing required parameter     |400 (Bad Request) |A parameter marked required in this document is not included in the request                                |
|Parameter incorrect type       |400 (Bad Request) |A parameter is included with a value of the wrong type (e.g. number is expected and string is provided)    |
|Parameter out of range         |400 (Bad Request) |A numeric parameter is included but the value is outside the allowed range                                 |
|Parameter not in set           |400 (Bad Request) |A string parameter has a set of predefined valid values, and the value provided is not included in that set|
|Parameter not in correct format|400 (Bad Request) |A string parameter with expected format is provided in the wrong format                                    |
