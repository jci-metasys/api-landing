---
title: "Quickstart"
permalink: /guides/quickstart/
group: quickstart
layout: post
color: green
icon: far fa-paper-plane
date: 2018-08-28
---

# Overview

The <i class="metasys"></i> API provides easy access for you to pull raw data out into your own processing and analytic mechanisms. The API mainly supports historical data fetching but also supports gathering information about the site and all of its child elements.

# Resources

Each resource available is queried by using its noun appended to the base URL of the API as shown below:

```http
GET https://<server-url>/api/v1/spaces HTTP/1.1
```

This shows an example of retrieving all spaces from the site director. Once elements are retrieved from the API, their IDs can be used in subsequent queries for additional information pertaining to that specific element.

The general form for querying information about a single element uses the following format of `/api/spaces/{id}` where `{id}` is the unique GUID representing the element.

{% include _partials/item.html
  class='info'
  icon='fa fa-info-circle'
  title='No Version, No Problem!'
  content='We all like the latest and greatest so if no version is present in the URL, the server will use the highest version available. However, this paradigm should only be used in development since after updating <i class="metasys"></i>, new versions may contain breaking changes.'
%}

# Authentication

There is a two-stage authentication mechanism in place to provide easy and secure access to your data. The initial step is basic authentication using Oauth2 and OpenID where you specify your username and password then receive a [JWT (JSON Web Token)][JWT]{:target="_blank"} in response which will subsequently be used for requesting authenticated data. The second stage is using that JWT as your access token in additional requests.

Along with the access token, an expiration time is also sent back indicating when the token needs to be refreshed by to ensure you don't get access denied errors. If the token expires before refreshing it, you will have to log back in with a username and password.

## Logging In

To login to the API, a POST request is to be sent to `/api/login` with the following details specified by the client where both an access token will be issued and sent back on successful authentication.

```properties
username=<username>
password=<password>
```

The `username` and `password` properties need to be filled in with the same credentials used to login to either the <i class="metasys"></i> UI or Software Management Portal. The access you have while using those tools will be the same access you receive when using the API. The request can be sent as either `x-www-form-urlencoded` or `application/json` content. In either format the names and values of the parameters are the same.

The response will appear like the following, including an access token, expiration duration, token type, and refresh token.

```javascript
{
  "accessToken": "eyJ0eXAiOiJMN1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IklFa3FIWUl1bHRlYlFMREVmWDVnMDViY2NxZyIsImtpZCI6IklFa3FIWUl1bHRlYlFMREVmWDVnMDViY2NxZyJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdC9BUEkuQXV0aGVudGljYXRpb25TZXJ2aWNlIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3QvQVBJLkF1dGhlbnRpY2F0aW9uU2VydmljZS9yZXNvdXJjZXMiLCJleHAiOjE1MjU5Njg3NzYsIm5iZiI6MTUyNTk2Njk3NiwiY2xpZW50X2lkIjoiTWV0YXN5cyBVSSIsInNjb3BlIjpbIm1ldGFzeXMtdWktYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJvcGVuaWQiXSwic3ViIjoiNjY0ZGQxZTMtZWE3OS00MTE5LWE5ZjgtNTMzZjJlZTU2OTFjIiwiYXV0aF90aW1lIjoxNTI1OTY2OTc2LCJpZHAiOiJpZHNydiIsIlVzZXJJZCI6IjEiLCJVc2VyTmFtZSI6Im1ldGFzeXNzeXNhZ2VudCIsIklzQWRtaW4iOiJUcnVlIiwiSXNQYXNzd29yZENoYW5nZVJlcXVpcmVkIjoiRmFsc2UiLCJJc1Rlcm1zQW5kQ29uZGl0aW9uc1JlcXVpcmVkIjoiRmFsc2UiLCJJc0xpY2Vuc2VkIjoiVHJ1ZSIsIkN1bHR1cmUiOiJlbi1VUyIsImFtciI6WyJwYXNzd29yZCJdfQ.HHNzOks154CWHG1lqmgq2cOueMFaIUtCbMu4_8bE2O8SdKKeoFKD91WMRUrKbrQ-EUiR7pSbl8HgrLNFaLDNGqFCxQUG7X3Qbc60fSZc-QAcit16pXuvfAdQ16iKTaUE6Wxja9PM_5x0JbvDHm4GghWeUonw5lsWB_iFjFQf23E1eOZAP_dA1ueiza1Uqz-5cQ8l5wylxQNIKevoUTxwb1mBKyEzHARGcThxsWJBW2qwfJUOHnmB67FMBJunHLerFeXpvj3xxobtKbkYVGaf2-kECArRILKEH5HO8MV1Fj4nloVUbL7z7uSfL_nSRDCH0wk8--SCWZW9N1qfMOhijQ",
  "expires": "2018-09-06T10:45:23Z",
}
```

## Refreshing the Token

The access token obtained by either logging in or upon refresh only lasts for so long before it expires. The expiration period is determined by the settings of the Metasys user profile for the user being logged in with and will be the lesser of 5 hours or the session duration setting for the user. The time at which the token will expire is reported in the `expires` property of the payload. In most cases, the expiration is set to 30 minutes from the issuing time as that is the default period recommended by Metasys.

The process of refreshing the token is much like any other request in the API once a user token is obtained. To refresh your accessToken, a GET request is to be sent to `/api/refreshToken` with your current accessToken provided in the Authentication header as `Bearer {{accessToken}}`. As long as the accessToken provided in the Authentication header is valid and has not expired the response will appear exactly as the login response with the expires set to a new time extended out from the current time.

```javascript
{
  "accessToken": "eyJ0eXAiOiJMN1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IklFa3FIWUl1bHRlYlFMREVmWDVnMDViY2NxZyIsImtpZCI6IklFa3FIWUl1bHRlYlFMREVmWDVnMDViY2NxZyJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdC9BUEkuQXV0aGVudGljYXRpb25TZXJ2aWNlIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3QvQVBJLkF1dGhlbnRpY2F0aW9uU2VydmljZS9yZXNvdXJjZXMiLCJleHAiOjE1MjU5Njg3NzYsIm5iZiI6MTUyNTk2Njk3NiwiY2xpZW50X2lkIjoiTWV0YXN5cyBVSSIsInNjb3BlIjpbIm1ldGFzeXMtdWktYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJvcGVuaWQiXSwic3ViIjoiNjY0ZGQxZTMtZWE3OS00MTE5LWE5ZjgtNTMzZjJlZTU2OTFjIiwiYXV0aF90aW1lIjoxNTI1OTY2OTc2LCJpZHAiOiJpZHNydiIsIlVzZXJJZCI6IjEiLCJVc2VyTmFtZSI6Im1ldGFzeXNzeXNhZ2VudCIsIklzQWRtaW4iOiJUcnVlIiwiSXNQYXNzd29yZENoYW5nZVJlcXVpcmVkIjoiRmFsc2UiLCJJc1Rlcm1zQW5kQ29uZGl0aW9uc1JlcXVpcmVkIjoiRmFsc2UiLCJJc0xpY2Vuc2VkIjoiVHJ1ZSIsIkN1bHR1cmUiOiJlbi1VUyIsImFtciI6WyJwYXNzd29yZCJdfQ.HHNzOks154CWHG1lqmgq2cOueMFaIUtCbMu4_8bE2O8SdKKeoFKD91WMRUrKbrQ-EUiR7pSbl8HgrLNFaLDNGqFCxQUG7X3Qbc60fSZc-QAcit16pXuvfAdQ16iKTaUE6Wxja9PM_5x0JbvDHm4GghWeUonw5lsWB_iFjFQf23E1eOZAP_dA1ueiza1Uqz-5cQ8l5wylxQNIKevoUTxwb1mBKyEzHARGcThxsWJBW2qwfJUOHnmB67FMBJunHLerFeXpvj3xxobtKbkYVGaf2-kECArRILKEH5HO8MV1Fj4nloVUbL7z7uSfL_nSRDCH0wk8--SCWZW9N1qfMOhijQ",
  "expires": "2018-09-06T11:15:32Z",
}
```

## Using the Token

The access token can then be used in the Authorization header of every request (except token refresh) with the contents being specified as `Bearer <access_token>`.

An example cURL request including the authorization header can be seen below otherwise other libraries may do the header formatting for you and you will only need to specify the type as being "Bearer Token" along with the token itself (for example, Postman).

```bash
curl --include \
     --header "Authorization: Bearer [token]" \
  'https://localhost/api/alarms/'
```

# Time Series Data

This section contains an example of the workflow towards requesting historical trend data. There are a few requisites before querying for trend samples, such as finding the object you want to gather samples for and more:

## Steps

1. [Available Object Types](#available-object-types)
2. [Obtaining the Objects](#obtaining-the-objects)
3. [Selecting Object Attributes](#selecting-object-attributes)
4. [Requesting Trend Samples](#requesting-trend-samples)

This example workflow takes the route of finding objects given a specific type then selecting a specific attribute on a single object to obtain the trend samples. Where an object is any item (site director, engine, point, integration, and so on), an attribute being a property of the item which has been setup to be trended, and samples being the value of the object's attribute at a specific point in time.

## Available Object Types

The available object types are listed as enum values through the enumerations endpoint under set 508. We are going to look at the `JCI AV` object type (analog value) in this example which the first page generously returns.

[Enumerations API Reference][Enumerations section]{:target="_blank"}

### Request

This request depicts that we are querying page one of the members in the 508th enum set. Where an enum set is a collection of closely related enum members that are generally used throughout the system to signify different types.

As a side note, all requests throughout the quickstart will not specify a specific version and will instead use the default latest version for brevity.

```http
GET /api/enumSets/508/members?page=1&pageSize=200 HTTP/1.1
```

### Response

Collection based responses for nearly all endpoints will be formatted in the same manner as the example below. The response includes the collection of items along with information needed to page through the results.

The responses will generally return references to other endpoints to obtain more information regarding that item otherwise everything for the enum value itself is presented in the body. As a forewarning, no versions are returned with the relationship links as it is up to the client to determine which version is to be used for each given link.

```json
{
  "total": 772,
  "next": "/enumSets/508/members?page=2&pageSize=200",
  "previous": null,
  "items": [
    ...
    {
      "id": 165,
      "description": "JCI AV",
      "self": "/enumSets/508/members/165",
      "set": "/enumSets/508"
    }
  ],
  "self": "/enumSets/508/members?page=1&pageSize=200"
}
```

{% include _partials/item.html
  class='warning'
  icon='fa fa-info-circle'
  title='Searching Support'
  content='Currently there is no server-side search support therefore all searching will have to be handled client side for now. The details for client-side searching will be presented later in this document TODO.'
%}

## Obtaining the Objects

Now that we have an object type for which we would like to query objects, we can supply the type id to the objects endpoint and retrieve all objects of type `JCI AV`.

[Objects API Reference][Objects section]{:target="_blank"}

### Request

The type id is supplied as a query parameter to filter the objects collection along with additional parameters such as for paging and sorting. The valid sort parameters are listed in the API docs under each action's sort parameter description.

```http
GET /api/objects?type=165&page=2&pageSize=20&sort=name HTTP/1.1
```

### Response

The objects response is very similar to the enum members response although containing different information for the items. Everything that is to be returned is listed in the API docs for the respective action. Here we see the `id`, `itemReference`, `name`, `type`, and `self` which are generally present in all other responses as well since they are used to identify each item throughout the system in a consistent manner.

```json
{
  "total": 96,
  "next": "/objects?type=165&page=3&pageSize=20&sort=name",
  "previous": "/objects?type=165&page=1&pageSize=20&sort=name",
  "items": [
    ...
    {
      "id": "b887ceaa-d1c7-5818-b689-1435161bb323",
      "itemReference": "Dew-pc1:Dew-NAE3511/AVs for Bulk Commanding.AV1",
      "name": "AV1 Min60 Max80Units%",
      "type": "/enumSets/508/members/165",
      "self": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323",
      "parent": "/objects/ac0db620-c70e-5c5d-8591-1ae35e58feec",
      "objects": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/objects",
      "networkDevice": "/networkDevices/803b4e32-0c4a-555f-bd08-4b024f420ae9",
      "points": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/points",
      "attributes": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes",
      "alarms": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/alarms",
      "audits": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/audits"
    }
  ],
  "self": "/objects?type=165&page=2&pageSize=20&sort=name"
}
```

## Selecting Object Attributes

Attributes will only be available for an object if trends have been setup for it. The object being used in the examples has a trend on the current value (attribute `85`) as shown below.

Paging is not supported for this endpoint as there are likely only a few attributes for any given object.

[Object Attributes API Reference][Object attributes section]{:target="_blank"}

### Request

This request is deduced from the `attributes` property above which supplies the exact route needed in order to query the attributes of the object. The route you use will be slightly different, consisting of a different id value.

```http
GET /api/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes HTTP/1.1
```

### Response

Two trends have been setup for this AV object which are returned below where the details of each can be seen via the `attribute` relationship link. The first attribute is for a trend on the current value and the second is a more obscure trend which we'll disregard in this example.

```json
{
  "total": 2,
  "items": [
    {
      "samples": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes/85/samples?startTime=2018-08-27%2011:41:49&endTime=2018-08-28%2011:41:49&page=1&pageSize=1000&sort=timestamp",
      "attribute": "/enumSets/509/members/85"
    },
    {
      "samples": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes/81/samples?startTime=2018-08-27%2011:41:49&endTime=2018-08-28%2011:41:49&page=1&pageSize=1000&sort=timestamp",
      "attribute": "/enumSets/509/members/81"
    }
  ],
  "self": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes"
}
```

## Requesting Trend Samples

Requesting trend samples is a little more complicated but just as before, we are able to use the relationship link returned from the response above. When requesting trend samples, a date-time range is required for constraining the range of samples being returned. However, the relationship links take care of this for us as they use the default parameters.

[Trend Samples API Reference][Samples section]{:target="_blank"}

### Request

The times were taken out of the range parameters for the sake of brevity but you may specify any date-times which are [ISO-8601 formatted][ISO-8601 Encoding]{:target="_blank"}. An example of a full date-time value would be `2018-08-28T17:24:50Z`.

There are likely to be thousands of samples available and it is up to the client to implement an efficient retrieval strategy as to not overload the server with requests.

```http
GET /api/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes/85/samples?startTime=2018-08-27&endTime=2018-08-29&page=1&pageSize=1000&sort=-timestamp HTTP/1.1
```

### Response

Each sample contains information about the trended attribute at a certain point in time. This sample, to be exact, was taken at 22:58:00 UTC on the 28th of August where the value was 4 and the units determined by the given `units` enum property relationship link (here it resolves to a `%`).

```json
{
  "total": 5036,
  "next": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes/85/samples?startTime=2018-08-27%2000:00:00&endTime=2018-08-29%2000:00:00&page=2&pageSize=1000&sort=-timestamp",
  "previous": null,
  "items": [
    ...
    {
      "value": {
        "value": 4,
        "units": "/enumSets/507/members/98"
      },
      "timestamp": "2018-08-28T22:58:00.0000000Z",
      "isReliable": true
    }
  ],
  "attribute": "/enumSets/509/members/85",
  "self": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323/attributes/85/samples?startTime=2018-08-27&endTime=2018-08-29&page=1&pageSize=1000&sort=-timestamp",
  "object": "/objects/b887ceaa-d1c7-5818-b689-1435161bb323"
}
```

[JWT]: https://jwt.io/
[ISO-8601 Encoding]: https://en.wikipedia.org/wiki/ISO_8601

[Authentication Login section]: {{ 'api/alderaan/#/reference/authentication/token-management/login-and-session-extension' | prepend: site.baseurl }}
[Enumerations section]: {{ 'api/alderaan/#/reference/enumerations/get-enum-members/get-enum-members' | prepend: site.baseurl }}
[Objects section]: {{ 'api/alderaan/#/reference/objects/get-objects/get-objects' | prepend: site.baseurl }}
[Object attributes section]: {{ 'api/alderaan/#/reference/samples/get-object-attributes-with-samples/get-object-attributes-with-samples' | prepend: site.baseurl }}
[Samples section]: {{ 'api/alderaan/#/reference/samples/get-samples-for-an-object-attribute/get-samples-for-an-object-attribute' | prepend: site.baseurl }}
