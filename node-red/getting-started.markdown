---
title: "Metasys Node-RED — Getting Started"
permalink: /node-red/getting-started/
layout: post
color: red
icon: fab fa-node-js
---

This guide assumes you have Node-RED running with the Metasys nodes installed.
For installation, upgrade, certificate, and security setup instructions see the
[Installation Guide]({% link node-red/installation.markdown %}).

Once installed, open Node-RED and confirm you can see the Metasys nodes in the
palette on the left under a **Metasys** section.

<img src="{{ '/assets/node-red/images/palette.png' | relative_url }}" alt="Metasys nodes in the Node-RED palette" class="img-responsive">

## What These Nodes Do

The Metasys nodes let Node-RED talk to a Metasys building automation server
using its REST API. You can:

- **Read** any attribute value from any Metasys object — present value,
  setpoint, occupancy status, alarms, and more.
- **Write** to writable attributes — adjust setpoints, change modes, send
  commands.
- **Adjust** an object's present value — like write attribute but limited to
  `presentValue` and with an optional priority level.
- **Release** an override — return an object to its normal control sequence.
- **Look up** an object by name — resolve a name to its Metasys ID, with
  optional caching to avoid repeated API calls.
- **Call any API endpoint** — query alarms, retrieve trend data, manage
  schedules, and more using the rest request node.

---

## Security

<div class="callout-block callout-danger">
  <div class="icon-holder"><i class="fas fa-exclamation-triangle"></i></div>
  <div class="content">
    <span class="callout-title">Security Warning</span>
    <p>These nodes connect Node-RED to a Metasys building automation system.
    Metasys controls physical systems — HVAC, access control, lighting, and more.
    An unsecured Node-RED instance is not just a data exposure risk; it is a
    direct path to those physical systems.</p>
  </div>
</div>

By default, Node-RED runs with no authentication and no encryption. **Secure
Node-RED before connecting it to a production Metasys server.** See the
[Installation Guide]({% link node-red/installation.markdown %}#security-recommendations) for what to configure and the
[Node-RED Security Guide](https://nodered.org/docs/user-guide/runtime/securing-node-red){:target="_blank"}
for step-by-step instructions.

---

## Before You Start: Find Your Object ID

Each read or write node needs the **object ID** of the Metasys object you want
to work with. Object IDs are unique identifiers (GUIDs) assigned by Metasys —
they look like `f63d8e01-e68b-5fa7-b41f-9b37e4dd6e6a`.

The easiest place to find one is in the Metasys UI: open the focus view for the
object, go to the **Engineering Values** section, and look for the **ID**
attribute. Copy that value — you'll paste it into the node configuration below.

<img src="{{ '/assets/node-red/images/object-id.png' | relative_url }}" alt="ID attribute in the Engineering Values section of the Metasys focus view" class="img-responsive">

Once you have an object's ID it never changes, so you can use it directly in
your node configurations.

---

## Your First Flow: Read an Attribute

This flow reads the `presentValue` attribute of a Metasys object when you click
a button.

### Build it manually

1. Drag an **inject** node onto the canvas. Double-click it and set **Name** to
   `start`. Leave everything else as-is — it will send a timestamp by default,
   but the value doesn't matter. It's the act of a message flowing through the
   wire that tells the read attribute node to fetch a value.

2. Drag a **read attribute** node to the right of the inject node. Double-click
   it and configure:
   - **Server** — click the pencil icon to create a new server configuration:
     - **Name** — a label for this server (e.g. `Metasys Server`). This is how
       you identify and select the server in each node if you have more than one.
     - **Host** — the hostname or IP address of your Metasys server (e.g.
       `metasys.example.com` or `192.168.1.100`)
     - **API Version** — leave as the default for Metasys 14 or later
     - **Username** and **Password** — your Metasys login credentials
     - If your server uses a certificate that Node.js doesn't trust by default,
       expand the **Certificate** section. See
       [Dealing with Certs]({% link node-red/installation.markdown %}#dealing-with-certs)
       in the Installation Guide.
     - Click **Add** to save.
   - **Object ID** — paste the object ID you found above
   - **Attribute** — enter `presentValue` (or any other attribute name)

<img src="{{ '/assets/node-red/images/read-attribute-config.png' | relative_url }}" alt="Read attribute node configuration panel" class="img-responsive">

<img src="{{ '/assets/node-red/images/server-config.png' | relative_url }}" alt="Metasys Server configuration panel" class="img-responsive">

<div class="callout-block callout-info">
  <div class="icon-holder"><i class="fas fa-info-circle"></i></div>
  <div class="content">
    <span class="callout-title">Tip</span>
    <p>The server node is a <em>configuration node</em> — it does not appear on the
    canvas. You manage it through the nodes that reference it, or through
    <strong>Menu → Configuration nodes</strong>.</p>
  </div>
</div>

3. Drag a **debug** node to the right of the read attribute node. Double-click
   it and set **Name** to `output`. Change **Output** from `msg.payload` to
   **complete msg object** so you can see the full response from Metasys, not
   just the value.

<img src="{{ '/assets/node-red/images/debug.png' | relative_url }}" alt="Debug node configuration" class="img-responsive">

4. Wire them together: inject → read attribute → debug.
5. Click **Deploy** (red button, top right).

<img src="{{ '/assets/node-red/images/read-flow.png' | relative_url }}" alt="Completed read attribute flow" class="img-responsive">

6. Click the button on the left side of the **start** node.
7. The attribute value appears in the **Debug** panel (right side, bug icon) and
   also on the node itself below its label. It should look something like this:

<img src="{{ '/assets/node-red/images/debug-output.png' | relative_url }}" alt="Debug output" class="img-responsive">

   You can click the disclosure triangle to more easily read the output. The
   `payload` in this case is the current value.

<img src="{{ '/assets/node-red/images/debug-pretty-output.png' | relative_url }}" alt="Debug output with JSON expanded" class="img-responsive">

<details>
<summary>Or import the example flow</summary>

Download [read-attribute.json]({{ '/assets/node-red/flows/read-attribute.json' | relative_url }}), then in Node-RED:

1. Open **Menu (☰) → Import**.
2. Click **select a file to import** and choose the downloaded file.
3. Click **Import**.
4. Double-click the **read attribute** node, click the pencil icon next to
   **Server**, and enter your host and credentials.
5. Enter your object ID in the **Object ID** field.
6. Click **Deploy**.

</details>

---

## Variation: Read on a Schedule

To read automatically every 60 seconds instead of on demand, change the inject node:

1. Double-click the inject node.
2. Enable **Inject once after** (so it reads immediately on deploy).
3. Enable **Repeat** and set the interval to `60` seconds.
4. Click **Done** and **Deploy**.

The current value appears on the node itself below its label, so you can see it
at a glance without opening the debug panel.

Download the pre-configured version: [scheduled-read.json]({{ '/assets/node-red/flows/scheduled-read.json' | relative_url }})

---

## Variation: Dynamic Object ID

You can override the object ID at runtime by setting `msg.objectId` before the
read attribute node. This lets one node serve many objects:

1. Add a **function** node before the read attribute node.
2. Set `msg.objectId` to the ID you want, for example:

```javascript
msg.objectId = flow.get('selectedObjectId');
return msg;
```

If `msg.objectId` is set it takes precedence over the value configured in the
node. The same pattern works for `msg.attribute` to override the attribute name.

---

## Write an Attribute

Writing works the same way as reading. The value to write comes from `msg.payload`.

### Build it manually

1. Drag an **inject** node onto the canvas. Double-click it and set:
   - **Payload** type to **number** (or string/boolean to match your attribute)
   - **Payload** value to the value you want to write (e.g. `72`)
2. Drag a **write attribute** node to the right. Double-click it and configure:
   - **Server** — your server
   - **Object ID** — the object to write to
   - **Attribute** — the attribute to write (e.g. `presentValue`)
3. Drag a **debug** node to the right.
4. Wire them: inject → write attribute → debug.
5. **Deploy** and click the inject button.

```text
[ inject (value=72) ] ──▶ [ write attribute ] ──▶ [ debug ]
```

The debug node confirms the write completed. If an error occurs it appears both
in the debug panel and on the node itself.

<details>
<summary>Or import the example flow</summary>

Download [write-attribute.json]({{ '/assets/node-red/flows/write-attribute.json' | relative_url }}) and import it
the same way as the read example. Change the inject node's payload to the value
you want to write before deploying.

</details>

---

## More Things to Try

### Chain lookup + read

Use the **lookup object id** node to resolve an object name to an ID, then feed
that into **read attribute** — useful when the object ID isn't known in advance
or may change across sites:

```text
[ inject ] ──▶ [ lookup object id ] ──▶ [ read attribute ] ──▶ [ debug ]
```

Enable caching on the lookup node so subsequent reads don't hit the API again.

### Threshold alert

Read a value on a schedule and send an alert when it crosses a limit:

```text
[ inject (every 60s) ] ──▶ [ read attribute ] ──▶ [ switch (payload > 80) ] ──▶ [ email / MQTT / ... ]
```

### Adjust and release

Use the **adjust value** node to send a command to an object (an override), and
**release** to remove it:

```text
[ inject ] ──▶ [ adjust value ]     (set an override)
[ inject ] ──▶ [ release ]          (remove the override)
```

### Custom API calls

Use the **rest request** node to call any Metasys REST API endpoint not covered
by the dedicated nodes — query alarms, retrieve trend data, manage schedules,
and more. Set `msg.relativeUrl` to the API path and `msg.method` to the HTTP
method.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Node shows **not connected** | Wrong host or credentials | Re-open the server config and verify host/user/password |
| Node shows **certificate error** | TLS trust issue | See [Dealing with Certs]({% link node-red/installation.markdown %}#dealing-with-certs) in the Installation Guide |
| Node shows **401 Unauthorized** | Credentials rejected | Check your Metasys username and password |
| Node shows **404 Not Found** | Object ID or attribute name is wrong | Verify the object ID using the lookup node |
| Read returns `null` | Attribute exists but has no value | Normal for some attributes in certain states |
| Node shows **rate limited** | Too many requests per second | The server config has a **Rate limit** setting — increase it or reduce polling frequency |
{: .table .table-striped .table-bordered}
