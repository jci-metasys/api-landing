---
title: "Historian"
permalink: /examples/data-extractor/
layout: post
color: purple
icon: fa fa-database
---

# Introduction

The Historian is a series of apps that will extract historical data from <i class="metasys"></i> into a data store of your choice and in a format that can be easily read by a BI tool such as PowerBI or Tableau.

There are three apps included in this source code:

- [Quick Extract](#quick-extract)
- [Discovery](#discovery)
- [Extraction](#extraction)

There is also a mechanism in place for you to be able to add your own data store for the historical data. You will simply need to implement one interface to do so. Instructions on that can be found in the [Data Storage](#data-storage) section.

# Source Code

You may browse the source code and look at how a DotNet Core application interacts with the <i class="metasys"></i> API. The following quickstart also assumes that you have the source code locally.

<a href="https://github.com/metasys-server/historian" class="btn btn-green" target="_blank" markdown="1">
  <i class="fas fa-code"></i> View Source Code
</a>

# Quick Extract

To run the quick extract, follow these instructions:

1. Download [dotnet core]
2. Clone this repository
3. From within the `QuickExtract` folder run the command shown below
4. Your results for the last day will be in the current directory with a new file named `timeseries.csv`

```bash
dotnet run --host <server.com> --u <Metasys Username> --p <Metasys Password>
```

## CLI Options For Quick Extract

     -h, --host          Required. Base URL <server.com> of the <i class="metasys"></i> Application
     -u, --username      Required. Username for the <i class="metasys"></i> Application
     -p, --password      Required. Password for the <i class="metasys"></i> Application
     -s, --service       (Default: time) Service to extract data from

# Discovery

The discovery app will process the network tree from <i class="metasys"></i> and determine which API end points should be used for the extraction calls.

This app allows you to specify FQRs for a more "focused" extraction. Providing specific FQRs allows the extractor to gather historical data for only the specified objects instead of samples for every object in the tree.

The Discovery app inserts and converts FQRs into GUIDs, and inserts the EnumSet information into SQLServer. The Discovery app can also run independently from the Extractor app. You may want to re-run the Discovery app when the list of FQRs is updated or when a new object is added to the <i class="metasys"></i> system.

To run the discovery, follow these instructions:

1. Download dotnet core (https://www.microsoft.com/net/learn/get-started/windows)
2. Clone this repository
3. Open the DBScripts folder and run each script, in numerical order, on your instance of SQL Server
4. From within the `Discovery` folder run the command shown below
5. Your results for the last day will be in the current directory with a new file named `timeseries.csv`

```bash
dotnet run --host <server.com> --u <Metasys Username> --p <Metasys Password> [--service time[,audit][,alarm]]
[--dest sqlserver] [--dbconnection "<Database connection string>"] [--fqrs "<FQR full file path>"]
```

## CLI Options For Discovery

     -h, --host          Required. Base URL <server.com> of the <i class="metasys"></i> Application
     -u, --username      Required. Username for the <i class="metasys"></i> Application
     -p, --password      Required. Password for the <i class="metasys"></i> Application
     -s, --service       (Default: time) Comma separated list of the service you wish to run ([Time][,Audit][,Alarm]).  Minimum of 1 service is required")
     -d, --dest          (Default: SqlServer) The Destination the data should be saved to ({Csv} | {SqlServer})
     -x, --dbconnection  Connection string required to connect to the desired DB
     -f, --fqrs          The absolute path to the file containing the fully qualified references

# Extraction

The extractor app creates jobs and adds tasks to the queue, then process the urls from the task queue. The API endpoints are called and the data is saved to the data store. This app is to be run when you want to get a large set of data or process the data to a CSV file. When you enter in the number of months or days to pull, keep in mind that data can be pulled only up to 3 days in the past.

```bash
dotnet run --host <server.com> --u <Metasys Username> --p <Metasys Password> [--service time[,audit][,alarm]]
[--dest sqlserver] [--dbconnection "<Database connection string>"] [--fqrs "<FQR full file path>"] [--M <number of months back>] [--D <Number of Days back>]
```

## CLI Options For Extraction

     -h, --host          Required. Base URL <server.com> of the <i class="metasys"></i> Application
     -u, --username      Required. Username for the <i class="metasys"></i> Application
     -p, --password      Required. Password for the <i class="metasys"></i> Application
     -s, --service       (Default: time) Comma separated list of the service you wish to run ([Time][,Audit][,Alarm]).  Minimum of 1 service is required")
     -d, --dest          (Default: SqlServer) The Destination the data should be saved to ({Csv} | {SqlServer})
     -x, --dbconnection  Connection string required to connect to the desired DB
     -f, --fqrs          The absolute path to the file containing the fully qualified references
     -D, --days   		 (Default: 0) The number of days you wish to query
     -M, --month		 (Default: 0) The number of months you wish to query

# Data Storage

## Overview

All of the concrete classes for the data stores are implementations of the `IDataStore` interface. The interface represents saving a single type of historical data (Time Series, Audit, or Alarm) to the data store. Meaning that a separate implementation must be made for each historical data type you are looking to save into the data store.

For example if you wanted to save the Audit and Time Series data, you would need to make two implementations of the `IDataStore`: one for the Time Series data and one for the Audit data.

This gives you the flexibility to only implement what you need and the rest will be ignored by the code. Each implementation will also need to pass declare the type for `T` as well. The data models in the Models folder should be sufficient for saving the data but can also be modified as needed if more or less data is needed depending on the use case.

Everything having to do with the data storage is in the HistoricalDataFetcher.DataStorage project. The project is broken up into five folders:

- Alarms
- Audits
- Interfaces
- Models
- TimeSeries

Each of the sections are covered in detail below:

## Alarms

The section that stores the implementation of the `IDataStore` interface for the Alarms data store.

## Audits

The section that stores the implementation of the `IDataStore` interface for the Audits data store.

## Interfaces

The section that declares the `IDataStore` interface which is root object that all of the data stores implement.

## TimeSeries

The section that stores the implementation of the `IDataStore` interface for the Time Series data store.

## Models

Declares the models that data store is expecting to use when storing the data.

## Custom Data Store

As described above, depending on your needs you can implement the `IDataStore` interface for one, two, or all three historical data types. Code elsewhere in the solution will also need to be modified to account for your new changes as well. The following are the steps needed to add a new implementation of `IDataStore`:

1. Create the implementation of the interface(s) that you are looking to create. It would be good practice to place the implementation into the same folder as the type (e.g. an implementation for pushing Alarm data should be in the Alarms folder). Be sure to use the correct data model for your implementation as well so that the data is stored correctly.
2. Go to the HistoricalDataFetcher.Classes project then go to `Controller\Controller.cs`
3. In the `SetDataSaveDestination()` function, you will see a case statement for `DestinationSave.Custom` with a `TODO:` comment. Set the data store variable(s) in that section to your custom implementation.

[dotnet core]: https://www.microsoft.com/net/learn/get-started/windows