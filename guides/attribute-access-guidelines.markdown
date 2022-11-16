---
title: "Guidelines for Accessing Attribute Values"
permalink: /guides/attribute-access-guidelines/
group: versions
layout: post
color: green
icon: fa fa-file-alt
---

<!-- markdownlint-disable no-duplicate-heading -->

The following sections contain guidelines for accessing attribute values efficiently in the Metasys API.

## Guidelines for batch reading of attribute values

Reading attribute values using batch operations can affect engine and server performance and the response times for queries. To ensure optimal performance and response times, use the following guidelines for batch reading of attribute values:

- Use batch operations to poll points that change their value frequently, for example, supply air flow and discharge air pressure. For points that do not change their value frequently, for example, zone air temperature and heating output, use streaming.

  See the following table for examples of points for polling and streaming. The points in the table represent only a subset of the typical points in an engine.

  | System | Point name | Polling | Streaming |
  | ------ | ---------- | :-----: | :-------: |
  | VAV    | ZNT-SP     |         |     x     |
  |        | EFFCLG-SP  |         |     x     |
  |        | EFFHTG-SP  |         |     x     |
  |        | SA-F       |    x    |           |
  |        | DPR-O      |         |     x     |
  |        | HTG-O      |         |     x     |
  | AHU    | DA-P       |    x    |           |
  |        | SA-VSD     |    x    |           |
  |        | RA-VSD     |    x    |           |
  |        | OA-F       |    x    |           |
  |        | SA-F       |    x    |           |
  |        | DA-T       |         |     x     |
  |        | HTG-O      |         |     x     |
  |        | CLG-O      |         |     x     |

- Observe the following rate limits for batch reading of attribute values:
    - Maximum number of read attribute operations in a batch request: 750
    - Maximum number of read attribute requests from a single engine: 750 per minute
    - Maximum number of batch requests sent to the server: 20 per minute
    - Total maximum number of read attribute operations: 750 per batch request per minute * 20 batch requests = 15,000 per minute

  **Note**: The rate limits have been tested on an ADX server with 65,535 MB RAM, 14 x Intel Xeon E5-2695 CPU. Number of engines: 359 in total, 2 x SNC25, 1 x SNE11, 12 x NAE35, 82 x NAE45, 117 x NAE55, 8 x NAE85, and 137 x NCE25.

  You can also poll multiple engines in a single batch request if you include less than 750 points per engine in the request. For example, you can poll 5 engines with up to 150 read attributes per engine in a single batch request. If you send 20 batch requests this way every minute, you can poll 20 * 5 = 100 engines every minute, reading 150 points from each engine.

  In an engine with 5,000 points, the number of the frequently changing points does not typically exceed 200. See the following table for an example of the number of points to poll in an engine:

  **Note**: All values in the following table are approximate values.

  | Systems           | Points per system | Total points | Points to poll |
  | ----------------- | ----------------: | -----------: | -------------: |
  | 100 VAVs          |                30 |         3000 |            100 |
  | 20 FCUs           |                30 |          600 |             20 |
  | 4 AHUs            |               100 |          400 |             20 |
  | 1 CW              |               150 |          150 |             10 |
  | 1 CHW             |               150 |          150 |             10 |
  | 1 HW              |               100 |          100 |             10 |
  | 2 meters          |                 2 |            4 |              4 |
  | Total: 129        |               562 |         4404 |            174 |

- Run batch operations only for as long as you need the data.
- Always close the connection after you receive the response.
