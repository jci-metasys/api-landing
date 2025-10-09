---
title: 'Version Support Matrix and Changelog'
permalink: /guides/version-support-matrix/
group: versions
layout: post
color: green
icon: fa fa-table
---

<!-- markdownlint-disable no-duplicate-heading no-inline-html no-emphasis-as-heading link-image-reference-definitions -->

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
      <td style="text-align: center;"><strong><a href="../../api/v1/">v1</a></strong></td>
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
      <td style="text-align: center;"><strong><a href="../../api/v2/">v2</a></strong></td>
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
      <td style="text-align: center;"><strong><a href="../../api/v3/">v3</a></strong></td>
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
      <td style="text-align: center;"><strong><a href="../../api/v4">v4</a></strong></td>
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
      <td style="text-align: center;"><strong><a href="../../api/v5">v5</a></strong></td>
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
      <td style="text-align: center;"><strong><a href="../../api/v6">v6</a></strong></td>
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
      <td style="text-align: center;"><strong><a href="../../api/v6-14-1">v6 for 14.1</a></strong></td>
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
      <td style="text-align: center;"><strong><a href="../../api/v6-15">v6 for 15</a></strong></td>
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

The changes for each release of the API are listed below.

### v6 (for 15.0) - 2025-10-6

No breaking changes were made.

#### Deprecated Operations

Deprecated operations continue to work but you should switch to the recommended
alternatives to avoid breakages in the future.

- Equipment
  - Get equipment instances (`GET /equipment`) is replaced by _Get equipment
    tree_.
  - Get equipment served by equipment (`GET /equipment/{equipmentId}/equipment`)
    is replaced by _Get served by equipment_.
  - Get equipment serving a space (`GET /spaces/{spaceId}/equipment`) is
    replaced by _Get equipment serving a space_
    (`GET /spaces/{spaceId}/servingEquipment`)
- Spaces
  - Get spaces (`GET /spaces`) is replaced by _Get spaces tree_.
  - Get space children (`GET /spaces/{spaceId}/spaces`) is replaced by _Get
    spaces subtree_.

#### Changed Operations

- Audits
  - Operations that return audits now may include the `signature` property.
- Objects
  - Get attributes (`GET /attributes`) now supports an `attributeFilter` query
    parameter.
- Network Devices
  - Get network devices (`GET /networkDevices`) now supports the
    `includeComplete` query parameter.
  - List network devices hosting an equipment instance
    (`GET /equipment/{equipmentId}/networkDevices`) now supports the
    `classification` query parameter.
  - The responses to operations that return network devices may now include
    `allowHttp`, `jciIpCommMode` and `deviceIpAddress` properties.
- Equipment
  - The responses to operations that return equipment instances may now include
    `hasUpstreamEquipment`, `equipmentDefinitionId`, `description`, `category`,
    `subsystemCategory` and `graphicAlias` properties.
  - List equipment points (`GET /equipment/{equipmentId}/points`) response now
    includes `objectReference` property.
- Spaces
  - The responses to operations that return spaces may now include
    `description`, `area` and `areaUnits` properties.

#### New Operations

- Equipment
  - Get equipment tree (`GET /equipment/tree`)
  - Get equipment subtree (`GET /equipment/tree/{objectId}`)
  - Get served by equipment (`GET equipment/{equipmentId}/servedEquipment`)
  - Get equipment serving a space (`GET /spaces/{spaceId}/servingEquipment`)
- Spaces
  - Get spaces tree (`GET /spaces/tree`)
  - Get spaces subtree (`GET /spaces/tree/{objectId}`)

### v6 (for 14.1) - 2025-05-09

No breaking changes were made.

#### Modified Operations

- Objects

  - The `object.values.notification` and `object.values.update` events now
    include a `subscriptionId` which identifies the subscription the event is
    associated with.

- Alarms
  - On BACnet AWS sites, alarms may contain an additional property named
    `bacnet`, and its value is an object that contains `deviceId`, `objectId`,
    `notificationClassId`, `timestamp` and `notifyType`.

### v6 (for 14.0) - 2024-08-12

#### Added Operations

- Time Series
  - Get trended object (`GET /timeSeries/{objectId}`)
  - Get trended attribute
    (`GET /timeSeries/{objectId}/trendedAttributes/{attributeId}`)

#### Removed Operations

These represent **Breaking Changes**.

- Alarms
  - List alarms - (`GET /alarms`)
- Audits
  - List audits - (`GET /audits`)

The replacement for these endpoints is
`GET /activities?activityType=[alarm|audit]`.

### v5 - 2023-09-30

#### Added Operations

- Objects
  - Lookup object identifier: `GET /objects/identifiers?fqr=`. This replaces
    `GET /objectIdentifiers?fqr=` which is now deprecated.
- Time Series
  - List all time series (repository): `GET /timeSeries`
  - List trended attributes (repository):
    `GET /timeSeries/{objectId}/trendedAttributes`
  - Get attribute samples:
    `GET timeSeries/{objectId}/trendedAttributes/{attributeId}/samples`
  - Batch operations for time series (repository): `POST /timeSeries/batch`
  - Create samples subscription (buffer):
    `POST /timeSeries/{streamId}/subscriptions`
  - Update samples subscription (buffer):
    `PUT /timeSeries/streams/{streamId}/subscriptions/{subscriptionId}`
  - Delete trend samples subscription:
    `DELETE /timeSeries/streams/{streamId}/subscriptions/{subscriptionId}`

#### Deprecated Operations

- Objects
  - Get object id (`GET /objectIdentifiers?fqr=`)
- Alarms
  - List alarms - (`GET /alarms`)
- Audits
  - List audits - (`GET /audits`)

#### Changed Operations

- Objects
  - Get object attributes with samples:
    `GET /objects/{objectId}/trendedAttributes` - **Breaking Changes**
    - Renamed to "List trended attributes (buffer)"
    - Previously this operation would return information from the historical
      repository (database). Now it returns data found in the buffer associated
      with the specified object. To get information contained in the repository
      use the new operation "List trended attributes (repository)".
- Time Series
  - Get samples for an object attributes:
    `GET /objects/{objectId}/trendedAttributes/{attributeId}/samples` -
    **Breaking Changes**
    - Renamed to "Get attribute samples (buffer)"
    - Previously this operation returned data found in the historical repository
      (database). Now it returns data found in the buffer associated with the
      specified object. To get information contained in the repository use the
      new operation "Get attribute samples (repository)".
- Enums
  - Get enumeration (`GET /schemas/enum/{enumId}`) - **Breaking Changes**
    - The members of the set are no longer wrapped inside of an `allOf`. This
      fixes a defect in the original implementation.

#### Removed Operations

These represent **Breaking Changes**.

- Time Series
  - Get network device attributes with samples. Use "List trended attributes
    (repository)" instead.
  - Get samples for a network device attribute. Use "Get attribute samples
    (repository)" instead.

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
      - Changed data type of `type` query parameter from array of numbers to
        array of strings from `alarmValueEnumSet`.
      - Changed data type of `category` query parameter from array of numbers to
        array of strings from `objectCategoryEnumSet`.
      - Replaced `excludeDiscarded`, `excludeAcknowledged` and `excludePending`
        query parameters with `includeAcknowledged` and `includeDiscarded`.
      - Added query parameters `includeAcknowledgementRequired` and
        `includeAcknowledgementNotRequired`.
      - Added query parameters `object`, `equipment` and `space`.
      - Removed query parameter `attribute`.
    - Response
      - Replaced `isAcknowledged` and `isDiscarded` properties of the alarm data
        model with `activityManagementStatus` property.
      - Modified the schema of the `triggerValue` property of the alarm data
        model to be more descriptive.
      - Added `spaces` and `equipment` properties to the alarm data model.
  - Get Alarms for an Object or a Network Device - **Breaking Changes**
    - These operations were modified in the same was as Get Alarms
  - Get Alarm - **Breaking Changes**
    - Response has been modified in the same ways as the response to Get Alarms
- Audits
  - Get Audits - **Breaking Changes**
    - Request
      - Renamed `classesLevels` query parameter to `classLevel` and changed data
        type from array of numbers to array of strings from
        `auditClassesEnumSet`.
      - Renamed `originalApplications` query parameter to `originApplication`
        and changed data type from array of numbers to array of strings from
        `auditOriginAppEnumSet`.
      - Renamed `actionTypes` to `actionType` and changed data type from array
        of numbers to array of strings from `auditActionTypeEnumSet`.
      - Removed `excludeDiscarded` query parameter.
      - Added query parameters: `user`, `includeDiscarded`, `equipment`,
        `object` and `space`.
      - Removed `includeSchema` query parameter (no longer needed as data within
        an audit is now self-describing).
    - Response
      - Added `activityManagementStatus` to audit data model.
      - Modified schema of `preData`, `postData` and `parameters` of the audit
        data model to better describe the data. Each value is presented along
        with a JSON Schema describing that value.
      - Removed `legacy` from the audit data model and moved the properties
        contained in it directly into the audit data model. The properties
        `itemName` and `fullyQualifiedReferenced` were renamed to `objectName`
        and `itemReference`.
  - Get Audits for an Object - **Breaking Changes**
    - Request and response were modified in the same ways as Get Audits.
  - Get Audit - **Breaking Changes**
    - Removed `includeSchema` query parameter.
    - Response
      - Response has been modified in the same ways as the response to Get
        Audits.
  - Discard an Audit - **Breaking Changes**
    - Renamed to "Edit an audit"
    - Method changed from a `PUT` to a `PATCH`
    - Path changed form `/audits/{id}/discard` to `/audits/{id}`
    - Added body to specify properties to edit (currently only
      `activityManagementStatus` is directly editable).
  - Get Audit Annotations
    - Added `startTime` and `endTime` query parameters.
- Objects
  - Get Objects - **Breaking Changes**
    - Renamed to "List objects".
    - Request
      - Removed `type`, `page`, `pageSize` and `sort` query parameters.
      - Added `depth`, `flatten`, `includeExtensions` and `pathTo` query
        parameters.
    - Response
      - The response is no longer a paged array but a tree representation.
      - Removed `total`, `prev` and `next` properties from response payload.
      - Replaced `typeUrl` property with `objectType` in the object model.
      - Added `items`, `hasChildrenMatchingQuery` and `classification`
        properties to the object model.
  - Get Object Children - **Breaking Changes**
    - Renamed to "List child objects".
    - Request
      - Removed `page`, `pageSize` and `sort` query parameters.
      - Added `depth`, `flatten`, `includeExtensions`, `pathTo`, `objectType`
        and `classification` query parameters.
    - Response
      - Response has been modified in the same ways as the response to Get
        Objects.
  - Get a single object attribute
    - Renamed to "Get attribute value".
    - Added `METASYS-SUBSCRIBE` header parameter to allow for change of value
      subscriptions.
    - Added `includeSchema` query parameter.
  - Get commands for an object - **Breaking Changes**
    - Renamed to "List commands".
    - The response has been changed.
    - Replaced the `type`, `items`, `minItems`, `maxItems` properties with
      `commandBodySchema` that includes the properties `parameters`, `priority`
      and `annotation`.
  - Get object create view schema - **Breaking Changes**
    - Renamed to "Get object type schema".
    - Removed the `localUniqueIdentifier` query parameter.
    - Changed `networkDeviceId` to `parentId` to better reflect it's purpose.
  - Batch operations
    - Added `METASYS-SUBSCRIBE` header parameter to allow for change of value
      subscriptions.

#### Removed Operations

- Network devices
  - Get network device types
- Objects
  - Get network device children objects (Use List child objects instead)

### v3 - 2020-12-17

#### Added

- [API version 3 release documentation](https://jci-metasys.github.io/api-landing/api/v3/#)
  with Metasys 11.0

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
    - Changed 'discarded' boolean to 'discardedTime' string in response payload.
      **Note**: Breaking change.
    - Included the 'schema' query parameter, which you can use to get optional
      schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get a single audit
    - Changed 'discarded' boolean to 'discardedTime' string in response payload.
      **Note**: Breaking change.
    - Included the 'schema' query parameter, which you can use to get optional
      schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get audits for an object
    - Changed 'discarded' boolean to 'discardedTime' string in response payload.
      **Note**: Breaking change.
    - Included the 'schema' query parameter, which you can use to get optional
      schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
- Alarms
  - Get alarms
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get a single alarm
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get alarms for a network device
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get alarms for an object
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
- Objects
  - Get network device children objects
    - Included the 'includeInternalObjects' query parameter, which you can use
      to include internal objects that are primarily used for developers and
      troubleshooting in response payload.
  - Get object children
    - Included the 'includeInternalObjects' query parameter, which you can use
      to include internal objects that are primarily used for developers and
      troubleshooting in response payload.
- Samples
  - Get network device with attributes with samples
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get samples for a network device attribute
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get object attributes with samples
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
  - Get samples for an object attribute
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.

### v2 - 2019-09-27

#### Added

- [API version 2 release documentation](https://jci-metasys.github.io/api-landing/api/v2/#)
  with Metasys 10.1
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
    - Included the 'schema' query parameter, which you can use to get optional
      schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**:
      Breaking change.
    - Changed 'attributes' link to 'trendedAttributesUrl'. **Note**: Breaking
      change.

#### Removed

- Support for API version 1.

### v1 - 2018-11-29

#### Added

- Initial
  [API version 1 release documentation](https://jci-metasys.github.io/api-landing/api/v1/#)
  with Metasys 10.0
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
