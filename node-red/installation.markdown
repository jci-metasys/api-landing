---
title: "Metasys Node-RED — Installation"
permalink: /node-red/installation/
layout: post
color: red
icon: fab fa-node-js
---

## Prerequisites

- Node >= 22.15
- Node-RED >= 4.1.0

You can get Node from the [Node.js website](https://nodejs.org){:target="_blank"}.

This package requires **Node-RED >= 4.1.0**. We recommend always running the
latest stable release of Node-RED — older versions contain known security
vulnerabilities. You can find the latest release on the
[Node-RED releases page](https://github.com/node-red/node-red/releases){:target="_blank"}.

<div class="callout-block callout-warning">
  <div class="icon-holder"><i class="fas fa-exclamation-circle"></i></div>
  <div class="content">
    <span class="callout-title">Note</span>
    <p>This package may work with Node-RED versions older than 4.1.0, but those
    versions are not tested or supported. Running an older version is not
    recommended due to security vulnerabilities that have been fixed in later
    releases.</p>
  </div>
</div>

---

## Installation

See [Verify Release Artifacts](#verify-release-artifacts) before installing.

This command works for both first-time installs and upgrades — npm replaces any
existing version automatically:

```bash
npm install -g node-red-contrib-metasys-rest-<version>.tgz
```

Replace `<version>` with the version number you received, for example
`node-red-contrib-metasys-rest-1.0.0.tgz`. You can confirm the installed
version afterwards:

```bash
npm list -g @metasys/node-red-contrib-metasys-rest
```

---

## Security Recommendations

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

By default, Node-RED runs **with no authentication and no encryption** and is
accessible to anyone who can reach port 1880 on your machine. Secure Node-RED
before connecting it to a production Metasys server:

1. **Enable authentication** — require a username and password to access the
   editor and API
2. **Enable HTTPS** — encrypt all traffic to and from the Node-RED editor
3. **Configure access control** — limit which users can edit flows vs. view them
4. **Restrict network access** — use firewalls or network segmentation so only
   authorised hosts can reach Node-RED

For step-by-step instructions, see the
[Node-RED Security Guide](https://nodered.org/docs/user-guide/runtime/securing-node-red){:target="_blank"}.

---

## Available Nodes

This package provides the following nodes for interacting with the Metasys REST API:

- **read attribute** — Reads attribute values from Metasys objects.
- **write attribute** — Writes values to writable Metasys attributes.
- **adjust value** — Like write attribute but limited to `presentValue`, with an optional priority level.
- **release** — Releases adjustments or overrides on Metasys objects.
- **rest request** — Call any synchronous request/response operation in the
  Metasys REST API by specifying the URL, method, and payload.
- **lookup object id** — Looks up an object's ID by name, with optional
  persistent caching to reduce repeated API calls.

Each node includes built-in help documentation accessible through the Node-RED editor.

---

## Persistent Caching

The **lookup object id** node can cache object ID lookups so that a name only
needs to be resolved via the API once. By default, Node-RED stores context data
in memory — the cache is cleared every time Node-RED restarts.

To make the cache survive restarts, set the default context store to
`localfilesystem` in Node-RED's `settings.js` file:

```javascript
contextStorage: {
  default: { module: 'localfilesystem' },
},
```

With this in place the cache is automatically written to disk and restored on
startup — no changes are needed in the node's configuration panel.

### Location of settings.js

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

---

## Running Node-RED on Boot

For production use, you'll want Node-RED to start automatically when the system
boots. Options include:

- **Windows**: Windows Service, Task Scheduler, or PM2
- **Linux**: systemd, init.d, or PM2
- **macOS**: launchd or PM2
- **Cross-platform**: PM2 process manager

For platform-specific setup instructions, see
[Starting Node-RED on boot](https://nodered.org/docs/faq/starting-node-red-on-boot){:target="_blank"}.

---

## Dealing with Certs

Node.js does not use the system certificate store by default. This means many
internal servers appear untrusted to a Node.js application.

The **Metasys server** config node has built-in certificate options that handle
the most common cases directly from the Node-RED editor — no environment
variables or command-line flags needed:

| Option | When to use |
| --- | --- |
| Use system CAs | Your server has a certificate issued by your organisation's IT department or a known CA already trusted by your OS. |
| CA Certificate (upload) | You have a specific root or intermediate CA certificate file (PEM format) to trust. |
| Disable TLS certificate verification | Development/lab only — never in production. Accepts any certificate without checking. |
{: .table .table-striped .table-bordered}

These options apply only to connections made by this node. They do not affect
other Node-RED nodes or system-wide trust settings.

---

## Verify Release Artifacts

Each release includes:

- `node-red-contrib-metasys-rest-<version>.tgz` — the npm package tarball
- `SHA256SUMS` — SHA-256 checksum for the tarball

This verification confirms that the `.tgz` file you downloaded has the same
SHA-256 hash as the value listed in `SHA256SUMS`. It verifies file integrity
only and does not validate authenticity or provenance.

<ul class="nav nav-tabs" id="verify-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#verify-win" aria-controls="verify-win" role="tab" data-toggle="tab">Windows</a></li>
  <li role="presentation"><a href="#verify-linux" aria-controls="verify-linux" role="tab" data-toggle="tab">Linux</a></li>
  <li role="presentation"><a href="#verify-mac" aria-controls="verify-mac" role="tab" data-toggle="tab">macOS</a></li>
</ul>
<div class="tab-content" style="padding-top:15px">
  <div role="tabpanel" class="tab-pane active" id="verify-win">
    <p>Download both files into a folder. Open PowerShell, change to that folder, then:</p>
    <p><strong>1. View the expected hash:</strong></p>
    <pre><code class="language-powershell">Get-Content .\SHA256SUMS</code></pre>
    <p><strong>2. Compute the hash of the tarball:</strong></p>
    <pre><code class="language-powershell">(Get-FileHash .\node-red-contrib-metasys-rest-&lt;version&gt;.tgz -Algorithm SHA256).Hash</code></pre>
    <p>Compare the two values — they must match (case-insensitive). If they do not match, do not install the tarball.</p>
  </div>
  <div role="tabpanel" class="tab-pane" id="verify-linux">
    <p>Download both files into a folder, open a terminal, change to that folder, then run:</p>
    <pre><code class="language-bash">sha256sum -c SHA256SUMS</code></pre>
    <p>A successful result looks like:</p>
    <pre><code class="language-bash">node-red-contrib-metasys-rest-&lt;version&gt;.tgz: OK</code></pre>
    <p>If the result shows <code>FAILED</code>, do not install the tarball. Re-download the file and try again.</p>
  </div>
  <div role="tabpanel" class="tab-pane" id="verify-mac">
    <p>Download both files into a folder, open a terminal, change to that folder, then run:</p>
    <pre><code class="language-bash">shasum -a 256 -c SHA256SUMS</code></pre>
    <p>A successful result looks like:</p>
    <pre><code class="language-bash">node-red-contrib-metasys-rest-&lt;version&gt;.tgz: OK</code></pre>
    <p>If the result shows <code>FAILED</code>, do not install the tarball. Re-download the file and try again.</p>
  </div>
</div>
