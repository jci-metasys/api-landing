---
title: "Version Support Matrix and Changelog"
permalink: /guides/version-support-matrix/
group: versions
layout: post
color: green
icon: fa fa-table
---

<!-- markdownlint-disable no-duplicate-heading -->

The following table shows which versions of the REST API are available for each release of Metasys.

> **Note** The REST API is not supported on Metasys for Validated Environments (MVE) sites. Do not attempt to use the REST API on an MVE site.

| API Version |            Metasys 10.0            |            Metasys 10.1            |            Metasys 11.0            |            Metasys 12.0            |
| ----------- | :--------------------------------: | :--------------------------------: | :--------------------------------: | :--------------------------------: |
| [v1][]      | <i class='fa fa-check-circle'></i> |    <i class='fa fa-times'></i>     |    <i class='fa fa-times'></i>     |    <i class='fa fa-times'></i>     |
| [v2][]      |                                    | <i class='fa fa-check-circle'></i> | <i class='fa fa-check-circle'></i> |    <i class='fa fa-check'></i>     |
| [v3][]      |                                    |                                    | <i class='fa fa-check-circle'></i> |    <i class='fa fa-check'></i>     |
| [v4][]      |                                    |                                    |                                    | <i class='fa fa-check-circle'></i> |

<br>**Legend**<br>

- <i class='fa fa-times'></i> - Not available
- <i class='fa fa-check-circle'></i> - Supported
- <i class='fa fa-check'></i> - Deprecated (supported, but may be removed in a future release)

[v1]: /api-landing/api/v1/
[v2]: /api-landing/api/v2/
[v3]: /api-landing/api/v3/
[v4]: /api-landing/api/v4

## Changelog

The list of changes to the API for each version are listed below.

### v4 - 2022-07-10

#### Added Operations

- Activities
  - List activities
  - Batch activity operations
  - Delete activity subscription
- Alarms
  - Edit an alarm (acknowledge or discard an alarm)
- Network devices
  - Delete a device
- Objects
  - List attributes of an object
  - Delete object subscription
  - Added support for streaming changes of value using server sent events.

#### Deprecated Operations

The following operations are still supported but they are deprecated.

- Alarms
  - Get Alarms (Recommend using Get Activities instead)
- Audits
  - Get Audits (Recommend using GetActivities instead)

#### Changed Operations

- Alarms
  - Get Alarms - **Breaking Changes**
    - Request
      - Changed data type of `type` query parameter from array of numbers to array of strings from `alarmValueEnumSet`.
      - Changed data type of `category` query parameter from array of numbers to array of strings from `objectCategoryEnumSet`.
      - Replaced `excludeDiscarded`, `excludeAcknowledged` and `excludePending` query parameters with `includeAcknowledged` and `includeDiscarded`.
      - Added query parameters `includeAcknowledgementRequired` and `includeAcknowledgementNotRequired`.
      - Added query parameters `object`, `equipment` and `space`.
      - Removed query parameter `attribute`.
    - Response
      - Replaced `isAcknowledged` and `isDiscarded` properties of the alarm data model with `activityManagementStatus` property.
      - Modified the schema of the `triggerValue` property of the alarm data model to be more descriptive.
      - Added `spaces` and `equipment` properties to the alarm data model.
  - Get Alarms for an Object or a Network Device - **Breaking Changes**
    - These operations were modified in the same was as Get Alarms
  - Get Alarm - **Breaking Changes**
    - Response has been modified in the same ways as the response to Get Alarms
- Audits
  - Get Audits - **Breaking Changes**
    - Request
      - Renamed `classesLevels` query parameter to `classLevel` and changed data type from array of numbers to array of strings from `auditClassesEnumSet`.
      - Renamed `originalApplications` query parameter to `originApplication` and changed data type from array of numbers to array of strings from `auditOriginAppEnumSet`.
      - Renamed `actionTypes` to `actionType` and changed data type from array of numbers to array of strings from `auditActionTypeEnumSet`.
      - Removed `excludeDiscarded` query parameter.
      - Added query parameters: `user`, `includeDiscarded`, `equipment`, `object` and `space`.
      - Removed `includeSchema` query parameter (no longer needed as data within an audit is now self-describing).
    - Response
      - Added `activityManagementStatus` to audit data model.
      - Modified schema of `preData`, `postData` and `parameters` of the audit data model to better describe the data. Each value is presented along with a JSON Schema describing that value.
      - Removed `legacy` from the audit data model and moved the properties contained in it directly into the audit data model. The properties `itemName` and `fullyQualifiedReferenced` were renamed to `objectName` and `itemReference`.
  - Get Audits for an Object - **Breaking Changes**
    - Request and response were modified in the same ways as Get Audits.
  - Get Audit - **Breaking Changes**
    - Removed `includeSchema` query parameter.
    - Response
      - Response has been modified in the same ways as the response to Get Audits.
  - Discard an Audit - **Breaking Changes**
    - Renamed to "Edit an audit"
    - Method changed from a `PUT` to a `PATCH`
    - Path changed form `/audits/{id}/discard` to `/audits/{id}`
    - Added body to specify properties to edit (currently only `activityManagementStatus` is directly editable).
  - Get Audit Annotations
    - Added `startTime` and `endTime` query parameters.
- Objects
  - Get Objects - **Breaking Changes**
    - Renamed to "List objects".
    - Request
      - Removed `type`, `page`, `pageSize` and `sort` query parameters.
      - Added `depth`, `flatten`, `includeExtensions` and `pathTo` query parameters.
    - Response
      - The response is no longer a paged array but a tree representation.
      - Removed `total`, `prev` and `next` properties from response payload.
      - Replaced `typeUrl` property with `objectType` in the object model.
      - Added `items`, `hasChildrenMatchingQuery` and `classification` properties to the object model.
  - Get Object Children - **Breaking Changes**
    - Renamed to "List child objects".
    - Request
      - Removed `page`, `pageSize` and `sort` query parameters.
      - Added `depth`, `flatten`, `includeExtensions`, `pathTo`, `objectType` and `classification` query parameters.
    - Response
      - Response has been modified in the same ways as the response to Get Objects.
  - Get a single object attribute
    - Renamed to "Get attribute value".
    - Added `METASYS-SUBSCRIBE` header parameter to allow for change of value subscriptions.
    - Added `includeSchema` query parameter.
  - Get commands for an object - **Breaking Changes**
    - Renamed to "List commands".
    - The response has been changed.
    - Replaced the `type`, `items`, `minItems`, `maxItems` properties with `commandBodySchema` that includes the properties `parameters`, `priority` and `annotation`.
  - Get object create view schema - **Breaking Changes**
    - Renamed to "Get object type schema".
    - Removed the `localUniqueIdentifier` query parameter.
    - Changed `networkDeviceId` to `parentId` to better reflect it's purpose.
  - Batch operations
    - Added `METASYS-SUBSCRIBE` header parameter to allow for change of value subscriptions.

#### Removed Operations

- Network devices
  - Get network device types
- Objects
  - Get network device children objects (Use List child objects instead)

### v3 - 2020-12-17

#### Added

- [API version 3 release documentation](https://jci-metasys.github.io/api-landing/api/v3/#) with Metasys 11.0

- Audits
  - Add audit annotation
  - Discard audit
  - Batch audit requests
    - Annotate audits
    - Discard audits

- Objects
  - Get supported child types
  - Get config view schema
  - Get object views
  - Create object
  - Delete object
  - Batch object requests

#### Changed

- Audits
  - Get audits
    - Changed 'discarded' boolean to 'discardedTime' string in response payload. **Note**: Breaking change.
    - Included the 'schema' query parameter, which you can use to get optional schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get a single audit
    - Changed 'discarded' boolean to 'discardedTime' string in response payload. **Note**: Breaking change.
    - Included the 'schema' query parameter, which you can use to get optional schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get audits for an object
    - Changed 'discarded' boolean to 'discardedTime' string in response payload. **Note**: Breaking change.
    - Included the 'schema' query parameter, which you can use to get optional schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
- Alarms
  - Get alarms
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get a single alarm
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get alarms for a network device
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get alarms for an object
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
- Objects
  - Get network device children objects
    - Included the 'includeInternalObjects' query parameter, which you can use to include internal objects that are primarily used for developers and troubleshooting in response payload.
  - Get object children
    - Included the 'includeInternalObjects' query parameter, which you can use to include internal objects that are primarily used for developers and troubleshooting in response payload.
- Samples
  - Get network device with attributes with samples
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get samples for a network device attribute
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get object attributes with samples
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get samples for an object attribute
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.

### v2 - 2019-09-27

#### Added

- [API version 2 release documentation](https://jci-metasys.github.io/api-landing/api/v2/#) with Metasys 10.1
- Objects
  - Lookup object ID
  - Get a single object attribute
  - Update an object
  - Get commands for an object
  - Send a command to an object<br><br>
- Schemas
  - Get a single enumeration schema

#### Changed

- Objects
  - Added more information on the functionality of Get a single object.
    - Added common object attributes to response payload.
    - Included the 'schema' query parameter, which you can use to get optional schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
    - Changed 'attributes' link to 'trendedAttributesUrl'. **Note**: Breaking change.

#### Removed

- Support for API version 1.

### v1 - 2018-11-29

#### Added

- Initial [API version 1 release documentation](https://jci-metasys.github.io/api-landing/api/v1/#) with Metasys 10.0
- Alarms
  - Get alarms
  - Get a single alarm
  - Get alarms for a network device
  - Get alarms for an object
- Annotations
  - Get alarm annotations
  - Get audit annotations
- Audits
  - Get audits
  - Get a single audit
  - Get audits for an object
- Authentication
  - Login
  - Refresh token
- Enumerations
  - Get enum sets
  - Get a single enum set
  - Get enum members
  - Get a single enum member
- Equipment
  - Get equipment instances
  - Get a single equipment instance
  - Get equipment served by an equipment instance
  - Get points defined by an equipment instance
  - Get equipment that serve an equipment instance
  - Get equipment hosted by a network device
  - Get equipment serving a space
- Network Devices
  - Get network devices
  - Get network device types
  - Get a single network device
  - Get network devices hosting an equipment instance
  - Get network device children
  - Get network devices serving a space
- Objects
  - Get objects
  - Get a single object
  - Get network device children objects
  - Get object children
  - Get equipment points mapped to an object
- Samples
  - Get network device with attributes with samples
  - Get samples for a network device attribute
  - Get object attributes with samples
  - Get samples for an object attribute
- Spaces
  - Get spaces
  - Get a single space
  - Get spaces served by an equipment instance
  - Get spaces served by a network device
  - Get space children
