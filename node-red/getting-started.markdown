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
palette on the left under a **Metasys** section. Custom categories appear after
Node-RED's built-in ones, so you may need to scroll down in the palette to find
it. You can pin it near the top via the `palette.categories` setting in `settings.js` — see [Pinning the Metasys palette section](#pinning-the-metasys-palette-section) in the appendix below.

<figure>
  <img src="{{ '/assets/node-red/images/palette.png' | relative_url }}" alt="Metasys nodes in the Node-RED palette" title="Metasys nodes in the Node-RED palette" class="img-responsive img-thumbnail" style="max-width: 400px">
  <figcaption>Metasys nodes in the Node-RED palette</figcaption>
</figure>

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

<figure>
  <img src="{{ '/assets/node-red/images/object-id.png' | relative_url }}" alt="ID attribute in the Engineering Values section of the Metasys focus view" title="ID attribute in the Engineering Values section of the Metasys focus view" class="img-responsive img-thumbnail" style="max-width: 700px">
  <figcaption>ID attribute in the Engineering Values section of the Metasys focus view</figcaption>
</figure>

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

<figure>
  <img src="{{ '/assets/node-red/images/read-attribute-config.png' | relative_url }}" alt="Read attribute node configuration panel" title="Read attribute node configuration panel" class="img-responsive img-thumbnail" style="max-width: 550px">
  <figcaption>Read attribute node configuration panel</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/node-red/images/server-config.png' | relative_url }}" alt="Metasys Server configuration panel" title="Metasys Server configuration panel" class="img-responsive img-thumbnail" style="max-width: 550px">
  <figcaption>Metasys Server configuration panel</figcaption>
</figure>

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

<figure>
  <img src="{{ '/assets/node-red/images/debug.png' | relative_url }}" alt="Debug node configuration" title="Debug node configuration" class="img-responsive img-thumbnail" style="max-width: 550px">
  <figcaption>Debug node configuration</figcaption>
</figure>

4. Wire them together: inject → read attribute → debug.
5. Click **Deploy** (red button, top right).

<figure>
  <img src="{{ '/assets/node-red/images/read-flow.png' | relative_url }}" alt="Completed read attribute flow" title="Completed read attribute flow" class="img-responsive img-thumbnail">
  <figcaption>Completed read attribute flow</figcaption>
</figure>

6. Click the button on the left side of the **start** node.
7. The attribute value appears in the **Debug** panel (right side, bug icon) and
   also on the node itself below its label. It should look something like this:

<figure>
  <img src="{{ '/assets/node-red/images/debug-output.png' | relative_url }}" alt="Debug output" title="Debug output" class="img-responsive img-thumbnail" style="max-width: 600px">
  <figcaption>Debug output</figcaption>
</figure>

   You can click the disclosure triangle to more easily read the output. The
   `payload` in this case is the current value.

<figure>
  <img src="{{ '/assets/node-red/images/debug-pretty-output.png' | relative_url }}" alt="Debug output with JSON expanded" title="Debug output with JSON expanded" class="img-responsive img-thumbnail" style="max-width: 600px">
  <figcaption>Debug output with JSON expanded</figcaption>
</figure>

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

---

## Appendix: Configuring settings.js

Two optional behaviors — pinning the Metasys palette section and enabling
persistent caching for the **lookup object id** node — require editing Node-RED's
`settings.js` file.

### Finding settings.js

| Platform | Default path |
| --- | --- |
| Windows | `%USERPROFILE%\.node-red\settings.js` |
| Linux / macOS | `~/.node-red/settings.js` |
{: .table .table-striped .table-bordered}

<div class="callout-block callout-warning">
  <div class="icon-holder"><i class="fas fa-exclamation-circle"></i></div>
  <div class="content">
    <span class="callout-title">Note</span>
    <p>If Node-RED is running as a system service (e.g., via systemd or as a Windows
    Service), <code>settings.js</code> may be in a different location depending on which
    user account the service runs under. Check your service configuration or run
    <code>node-red --help</code> to confirm the active user data directory.</p>
  </div>
</div>

### Editing settings.js

Open the file in any text editor. It exports a JavaScript object — add or update
the relevant keys inside `module.exports = { ... }`. After saving, restart
Node-RED for the changes to take effect.

### Pinning the Metasys palette section

The `palette.categories` setting controls the order of sections in the palette.
Custom categories like **Metasys** appear after the built-in ones by default. To
pin it near the top, add a `palette` block with a `categories` array:

```javascript
palette: {
    categories: ['Metasys', 'subflows', 'common', 'function', 'network', 'sequence', 'parser', 'storage'],
},
```

The name is case-sensitive and must match exactly — `'Metasys'` with a capital M.
Categories not listed still appear, but are pushed to the bottom.

If `settings.js` already has a `palette:` block (it may be commented out), uncomment
it and add `categories` inside rather than creating a second `palette:` entry.

### Enabling persistent caching

The **lookup object id** node caches object ID lookups in Node-RED's context
store. By default this is in-memory and is lost on restart. To make it survive
restarts, set the default context store to `localfilesystem`:

```javascript
contextStorage: {
  default: { module: 'localfilesystem' },
},
```

With this in place the cache is written to disk automatically — no changes are
needed in the node's configuration panel.
