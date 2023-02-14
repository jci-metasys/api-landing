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

Reading attribute values using batch operations, that is, polling points, can affect engine and server performance and the response times for queries. To ensure optimal performance and response times, use the following guidelines for batch reading of attribute values:

- The supported maximum for polling is 750 points per engine.
- The supported maximum for streaming is 1,500 points per engine.
- The supported server maximums are as follows: **MISSING**
- Use polling for points that change their value frequently, for example, flow, pressure, and output values. For points that do not change their value frequently, for example, zone air temperature and heating output, use streaming.
- Do not poll points more frequently than once per minute.
- To reduce the number of points polled, use the COV Min Time attribute at the point and at the engine.
- Run batch operations only for as long as you need the data.
- Always close the connection after you receive the response.

## Polling and streaming example

The following example illustrates how to use polling and streaming while still maintaining the necessary resource performance to properly run Metasys software.

**Note**: All values in the following tables are approximate values.

The following table shows an example SNE with the number of points that generally need polling and streaming for an average and heavy monitoring scenario. This example SNE contains the following systems:

- Variable Air Volume (VAV)
- Air Handling Unit (AHU)
- Unit Heater (UH)
- Exhaust Fan (EF)
- Sump pump

| Systems           | Points/system | Total points | Polling | Streaming | Polling | Streaming |
| ----------------- | ------------: | -----------: | ------: | --------: | ------: | --------: |
| | | | Average monitoring | Average monitoring | Heavy monitoring | Heavy monitoring |
| 72 VAVs           |            24 |         1728 |     288 |       288 |     288 |       792 |
| 2 AHUs            |            44 |           88 |      20 |        36 |      18 |        50 |
| 7 UH              |            22 |          154 |       7 |        77 |      14 |        98 |
| 3 EFs             |             6 |           18 |       0 |         9 |       0 |        18 |
| 1 Sump pump       |             2 |            2 |       0 |         1 |       0 |         2 |
| Total: 85         |            98 |         1990 |     315 |       411 |     320 |       960 |

The following sections list the individual points to poll and stream for each system in this example.

### VAV example points

The following table contains the VAV points in this example to poll and stream in an average and heavy monitoring scenario.

| Point name   | Long name                       | Polling | Streaming | Polling | Streaming |
| ------------ | ------------------------------- | :-----: | :-------: | :-----: | :-------: |
| | | Average monitoring | Average monitoring | Heavy monitoring | Heavy monitoring |
| AUTOCAL-C    | Autocalibration Command         |         |           |         |           |
| FLUSHPOS     | Water Flush Valve Position      |         |           |         |           |
| HTG-EN       | Heating Enable                  |         |           |         |           |
| OCC-SCHEDULE | Occupancy Schedule              |         |           |         |           |
| EFF-OCC      | Effective Occupancy             |         |     x     |         |     x     |
| SA-T         | Supply Air Temperature          |         |           |         |     x     |
| SYSTEM-MODE  | System Mode                     |         |           |         |           |
| TUNING-RESET | Tuning Reset                    |         |           |         |           |
| UNITEN-MODE  | Unit Enable Mode                |         |           |         |           |
| WC-C         | Warmup Cooldown Command         |         |           |         |           |
| WC-S         | Warmup Cooldown Status          |         |           |         |     x     |
| ZNT-STATE    | Zone Temperature State          |         |           |         |     x     |
| ZN-T         | Zone Air Temperature            |         |     x     |         |     x     |
| ZN-SP        | Zone Setpoint                   |         |           |         |     x     |
| EFFCLG-SP    | Effective Cooling Setpoint      |         |     x     |         |     x     |
| EFFHTG-SP    | Effective Heating Setpoint      |         |     x     |         |     x     |
| CLG-MAXFLOW  | Cooling Maximum Flow Setpoint   |         |           |         |     x     |
| HTG-MINFLOW  | Heating Minimum Flow Setpoint   |         |           |         |     x     |
| DA-T         | Discharge Air Temperature       |         |           |         |     x     |
| SA-F\*       | Supply Air Flow                 |    x    |           |    x    |           |
| DA-VP\*      | Discharge Air Velocity Pressure |         |           |         |           |
| SAFLOW-SP\*  | Supply Air Flow Setpoint        |    x    |           |    x    |           |
| DPR-O\*      | Damper Output                   |    x    |           |    x    |           |
| HTG-O\*      | Heating Output                  |    x    |           |    x    |           |
| Total        |                              24 |       4 |         4 |    4    |     11    |

**Notes**:

- SA-F: Changes frequently and cannot be controlled through the API. Only poll in the frequency that you need, but normally it is not needed every minute.
- DA-VP: Changes frequently and does not provide valuable information, do not poll or stream.
- If the polled points use COV Min Time (by default 15 seconds), then you can move to streaming.

### AHU example points

The following table contains the AHU points in this example to poll and stream in an average and heavy monitoring scenario.

| Point name   | Long name                          | Polling | Streaming | Polling | Streaming |
| ------------ | ---------------------------------- | :-----: | :-------: | :-----: | :-------: |
| | | Average monitoring | Average monitoring | Heavy monitoring | Heavy monitoring |
| DA1-P        | Discharge Air Pressure 1           | x       |           | x       |           |
| DA-T         | Discharge Air Temperature          |         | x         |         | x         |
| BDLG-SP      | Building Pressure Setpoint         | x       |           |         | x         |
| CLG-EN       | Cooling Enable                     |         |           |         |           |
| CLGUNOCC-SP  | Unoccupied Cooling Setpoint        |         |           |         | x         |
| DAP-SP       | Discharge Air Pressure Setpoint    |         | x         |         | x         |
| DAT-SP       | Discharge Air Temperature Setpoint |         | x         |         | x         |
| HTGUNOCC-SP  | Unoccupied Heating Setpoint        |         |           |         | x         |
| HUM-EN       | Humidifier Enable                  |         |           |         |           |
| HUM-SP       | Humidifier Setpoint                |         | x         |         | x         |
| MOAFLOW-SP   | Minimum Outdoor Air Flow Setpoint  |         | x         |         | x         |
| OA-T\*       | Outdoor Air Temperature            |         |           |         |           |
| OCC-OVERRIDE | Occupancy Override                 |         |           |         | x         |
| OCC-SCHEDULE | Occupancy Schedule                 |         |           |         | x         |
| EFF-OCC      | Effective Occupancy                |         | x         |         | x         |
| PH-EN        | Preheat Enable                     |         |           |         |           |
| RH-EN        | Reheat Enable                      |         |           |         |           |
| TUNING-RESET | Tuning Reset                       |         |           |         |           |
| UNITEN-MODE  | Unit Enable Mode                   |         | x         |         | x         |
| WC-C         | Warmup Cooldown Command            |         |           |         | x         |
| BLDG-P\*     | Building Pressure                  | x       |           | x       |           |
| DAPHI-A      | Discharge Air Pressure High Alarm  |         | x         |         | x         |
| LT-A         | Low Temperature Alarm              |         | x         |         | x         |
| MA-T         | Mixed Air Temperature              |         | x         |         | x         |
| OA-F\*       | Outdoor Air Flow                   | x       |           | x       |           |
| PFILT-S      | Pre-filter Status                  |         |           |         |           |
| PH-T         | Preheat Air Temperature            |         | x         |         | x         |
| RA-H         | Return Air Humidity                |         | x         |         | x         |
| RA-T         | Return Air Temperature             |         | x         |         | x         |
| RF-S         | Return Fan Status                  |         | x         |         | x         |
| SF-S         | Supply Fan Status                  |         | x         |         | x         |
| CLG-O\*      | Cooling Output                     | x       |           | x       |           |
| HUM-C        | Humidifier Command                 |         | x         |         | x         |
| HUM-O\*      | Humidifier Output                  | x       |           | x       |           |
| MAD-O\*      | Mixed Air Damper Output            | x       |           | x       |           |
| PH-O\*       | Preheat Output                     | x       |           | x       |           |
| RF-C         | Return Fan Command                 |         | x         |         | x         |
| RF-O\*       | Return Fan Output                  | x       |           | x       |           |
| SF-C         | Supply Fan Command                 |         | x         |         | x         |
| SF-O\*       | Supply Fan Output                  | x       |           | x       |           |
| ECONSWO-SP   | Economizer Switchover Setpoint     |         |           |         |           |
| OALT-SP      | Low OA Temperature Setpoint        |         |           |         |           |
| LT-SP        | Low Temperature Setpoint           |         |           |         |           |
| AHU-STATE    | Air Handling Unit State            |         |           |         | x         |
| Total        | 44                                 | 10      | 18        | 9       | 25        |

**Notes**:

- OA-T: If points are shared, sign up only for data from the master (sensor) object.
- If the polled points use COV Min Time (by default 15 seconds), then you can move to streaming.

### UH example points

The following table contains the UH points in this example to poll and stream in an average and heavy monitoring scenario.

| Point name   | Long name                             | Polling | Streaming | Polling | Streaming |
| ------------ | ------------------------------------- | :-----: | :-------: | :-----: | :-------: |
| | | Average monitoring | Average monitoring | Heavy monitoring | Heavy monitoring |
| DATLL-SP     | Discharge Air Temp Low Limit Setpoint |         |           |         |           |
| HTG-EN       | Heating Enable                        |         |           |         |           |
| OA-T\*       | Outdoor Air Temperature               |         |           |         |           |
| OCC-SCHEDULE | Occupancy Schedule                    |         |           |         | x         |
| TUNING-RESET | Tuning Reset                          |         |           |         |           |
| UNITEN-MODE  | Unit Enable Mode                      |         | x         |         | x         |
| DA-T         | Discharge Air Temperature             |         | x         |         | x         |
| FILT-S       | Filter Status                         |         |           |         |           |
| LT-A         | Low Temperature Alarm                 |         | x         |         | x         |
| ZN-SP        | Zone Setpoint                         |         |           |         | x         |
| ZN-T         | Zone Air Temperature                  |         | x         |         | x         |
| ZN-TOCC      | Zone Temporary Occupancy              |         |           |         | x         |
| ZNF-O\*      | Zone Fan Output                       | x       |           | x       |           |
| HTG1-C       | Heating Stage 1 Command               |         | x         |         | x         |
| HTG2-C       | Heating Stage 2 Command               |         | x         |         | x         |
| HTG3-C       | Heating Stage 3 Command               |         | x         |         | x         |
| SFH-C        | Supply Fan High Command               |         | x         |         | x         |
| SFL-C        | Supply Fan Low Command                |         | x         |         | x         |
| SFM-C        | Supply Fan Medium Command             |         | x         |         | x         |
| EFFHTG-SP    | Effective Heating Setpoint            |         | x         |         | x         |
| OALL-SP      | Outdoor Air Low Limit Setpoint        |         |           |         |           |
| HTG-O        | Heating Output                        |         |           | x       |           |
| Total        | 22                                    | 1       | 11        | 2       | 14        |

**Notes**:

- OA-T: If points are shared, sign up only for data from the master (sensor) object.
- If the polled points use COV Min Time (by default 15 seconds), then you can move to streaming.

### EF example points

The following table contains the EF points in this example to poll and stream in an average and heavy monitoring scenario.

| Point name   | Long name                          | Polling | Streaming | Polling | Streaming |
| ------------ | ---------------------------------- | :-----: | :-------: | :-----: | :-------: |
| | | Average monitoring | Average monitoring | Heavy monitoring | Heavy monitoring |
| EF1-C        | Exhaust Fan 1 Command              |         |           |         |     x     |
| EF1-S        | Exhaust Fan 1 Status               |         |     x     |         |     x     |
| EF2-C        | Exhaust Fan 2 Command              |         |           |         |     x     |
| EF2-S        | Exhaust Fan 2 Status               |         |     x     |         |     x     |
| EF3-C        | Exhaust Fan 3 Command              |         |           |         |     x     |
| EF3-S        | Exhaust Fan 3 Status               |         |     x     |         |     x     |
| Total        | 6                                  |    0    |     3     |    0    |     6     |

### Sump pump example points

The following table contains the sump pump points in this example to poll and stream in an average and heavy monitoring scenario.

| Point name   | Long name                          | Polling | Streaming | Polling | Streaming |
| ------------ | ---------------------------------- | :-----: | :-------: | :-----: | :-------: |
| | | Average monitoring | Average monitoring | Heavy monitoring | Heavy monitoring |
| SP1-C        | Sump Pump 1 Command                |         |     x     |         |     x     |
| SP1-S        | Sump Pump 1 Status                 |         |           |         |     x     |
| Total        | 2                                  | 0       | 1         | 0       | 2         |
