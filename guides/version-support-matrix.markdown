---
title: "Version Support Matrix and Changelog"
permalink: /guides/version-support-matrix/
group: versions
layout: post
color: green
icon: fa fa-table
---

The following table shows which versions of the REST API are available for each release of Metasys.

| API Version |            Metasys 10.0            |            Metasys 10.1            |            Metasys 11.0            |            Metasys 12.0            |
| ----------- | :--------------------------------: | :--------------------------------: | :--------------------------------: | :--------------------------------: |
| [v1][]      | <i class='fa fa-check-circle'></i> |    <i class='fa fa-times'></i>     |    <i class='fa fa-times'></i>     |    <i class='fa fa-times'></i>     |
| [v2][]      |    <i class='fa fa-times'></i>     | <i class='fa fa-check-circle'></i> | <i class='fa fa-check-circle'></i> |    <i class='fa fa-check'></i>     |
| [v3][]      |    <i class='fa fa-times'></i>     |    <i class='fa fa-times'></i>     | <i class='fa fa-check-circle'></i> |    <i class='fa fa-check'></i>     |
| [v4][]      |    <i class='fa fa-times'></i>     |    <i class='fa fa-times'></i>     |    <i class='fa fa-times'></i>     | <i class='fa fa-check-circle'></i> |

**Legend**

- <i class='fa fa-times'></i> - Not available
- <i class='fa fa-check-circle'></i> - Supported
- <i class='fa fa-check'></i> - Deprecated (supported, but may be removed in a future release)

[v1]: /api-landing/api/v1/
[v2]: /api-landing/api/v2/
[v3]: /api-landing/api/v3/
[v4]: /api-landing/api/v4

Use the following information to view all API functional changes to the _Metasys_ server API.

<!-- markdownlint-disable no-duplicate-heading -->

## v4 - 2022-07-10

### Added

- Activities
  - List activities
  - Batch activity operations
  - Delete activity subscription
- Alarms
  - Edit an alarm (acknowledge or discard an alarm)
- Network Devices
  - Delete a device

### Changed

### Removed

- network devices
  - Get network device types (See )

## v3 - 2020-12-17

### Added

- [API version 3 release documentation](https://metasys-server.github.io/api-landing/api/v3/#) with Metasys 11.0
- Activities
  - Get activities (Private)
  - Search activities (Private)
- Audits
  - Add audit annotation
  - Discard audit
  - Search audits (Private)
  - Batch audit requests
    - Annotate audits
    - Discard audits
- Involvement
  - Get object involvement (Private)
- Objects
  - Get supported child types
  - Get config view schema
  - Get object views
  - Create object
  - Delete object
  - Batch object requests

### Changed

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
    - Included the 'includeInternalObjects' query parameter, which you can use to include internal objects that are primarily used for developers and troubelshooting in response payload.
  - Get object children
    - Included the 'includeInternalObjects' query parameter, which you can use to include internal objects that are primarily used for developers and troubelshooting in response payload.
- Samples
  - Get network device with attributes with samples
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get samples for a network device attribute
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get object attributes with samples
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
  - Get samples for an object attribute
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.

## v2 - 2019-09-27

### Added

- [API version 2 release documentation](https://metasys-server.github.io/api-landing/api/v2/#) with Metasys 10.1
- Objects
  - Lookup object ID
  - Get a single object attribute
  - Update an object
  - Get commands for an object
  - Send a command to an object<br><br>
- Schemas
  - Get a single enumeration schema

### Changed

- Objects
  - Added more information on the functionality of Get a single object.
    - Added common object attributes to response payload.
    - Included the 'schema' query parameter, which you can use to get optional schema in response payload.
    - Changed response payload 'enumSet' links to enum values. **Note**: Breaking change.
    - Changed 'attributes' link to 'trendedAttributesUrl'. **Note**: Breaking change.

### Removed

- Support for API version 1.

## v1 - 2018-11-29

### Added

- Initial [API version 1 release documentation](https://metasys-server.github.io/api-landing/api/v1/#) with Metasys 10.0
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
