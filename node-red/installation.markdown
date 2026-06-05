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

**Important:** If you have previously installed this package, see
[Upgrading to a New Version](#upgrading-to-a-new-version) instead.

```bash
npm install -g node-red-contrib-metasys-rest-<version>.tgz
```

Replace `<version>` with the version number you received, for example
`node-red-contrib-metasys-rest-1.0.0.tgz`.

---

## Upgrading to a New Version

Check if you already have a version installed:

```bash
npm list -g @metasys/node-red-contrib-metasys-rest
```

If an existing version is shown, uninstall it before installing the new one:

```bash
npm uninstall -g @metasys/node-red-contrib-metasys-rest
```

Then follow the [Installation](#installation) instructions above.

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

### Certificate Options in the Node Editor

The **Metasys server** config node has built-in certificate options that are
often the easiest way to resolve trust issues without changing your environment:

| Option | When to use |
| --- | --- |
| Use system CAs | Your server has a certificate issued by your organisation's IT department or a known CA already trusted by your OS. |
| CA Certificate (upload) | You have a specific root or intermediate CA certificate file (PEM format) to trust. |
| Disable TLS certificate verification | Development/lab only — never in production. Accepts any certificate without checking. |
{: .table .table-striped .table-bordered}

These options apply only to connections made by this node. They do not affect
other Node-RED nodes or system-wide trust settings.

### Using the System Store

Set the `NODE_USE_SYSTEM_CA` environment variable to `1` before starting Node-RED.
This is the easiest option when your server certificate was issued by your IT department.

<ul class="nav nav-tabs" id="sys-ca-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#sys-ca-ps" aria-controls="sys-ca-ps" role="tab" data-toggle="tab">PowerShell</a></li>
  <li role="presentation"><a href="#sys-ca-cmd" aria-controls="sys-ca-cmd" role="tab" data-toggle="tab">Command Prompt</a></li>
  <li role="presentation"><a href="#sys-ca-nix" aria-controls="sys-ca-nix" role="tab" data-toggle="tab">Linux / macOS</a></li>
</ul>
<div class="tab-content" style="padding-top:15px">
  <div role="tabpanel" class="tab-pane active" id="sys-ca-ps">
    <pre><code class="language-powershell">$env:NODE_USE_SYSTEM_CA=1
node-red</code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="sys-ca-cmd">
    <pre><code class="language-batch">set NODE_USE_SYSTEM_CA=1
node-red</code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="sys-ca-nix">
    <pre><code class="language-bash">NODE_USE_SYSTEM_CA=1 node-red</code></pre>
  </div>
</div>

### Specifying a CA Certificate

If your server uses a self-signed certificate, set `NODE_EXTRA_CA_CERTS` to a PEM
file containing the root (and optionally intermediate) CA certificates to trust.

<ul class="nav nav-tabs" id="ca-cert-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#ca-cert-ps" aria-controls="ca-cert-ps" role="tab" data-toggle="tab">PowerShell</a></li>
  <li role="presentation"><a href="#ca-cert-cmd" aria-controls="ca-cert-cmd" role="tab" data-toggle="tab">Command Prompt</a></li>
  <li role="presentation"><a href="#ca-cert-nix" aria-controls="ca-cert-nix" role="tab" data-toggle="tab">Linux / macOS</a></li>
</ul>
<div class="tab-content" style="padding-top:15px">
  <div role="tabpanel" class="tab-pane active" id="ca-cert-ps">
    <pre><code class="language-powershell">$env:NODE_EXTRA_CA_CERTS=C:\Users\tom\certs\certs.pem
node-red</code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="ca-cert-cmd">
    <pre><code class="language-batch">set NODE_EXTRA_CA_CERTS=C:\Users\tom\certs\certs.pem
node-red</code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="ca-cert-nix">
    <pre><code class="language-bash">NODE_EXTRA_CA_CERTS=~/certs/certs.pem node-red</code></pre>
  </div>
</div>

<div class="callout-block callout-info">
  <div class="icon-holder"><i class="fas fa-info-circle"></i></div>
  <div class="content">
    <span class="callout-title">Note</span>
    <p><code>certs.pem</code> should contain the root CA and (if applicable) intermediate CA
    certificates concatenated into one file. This trusts any certificate signed by
    that CA chain, including self-signed certificates you add directly.</p>
  </div>
</div>

### Disabling Certificate Verification

<div class="callout-block callout-danger">
  <div class="icon-holder"><i class="fas fa-exclamation-triangle"></i></div>
  <div class="content">
    <span class="callout-title">Warning</span>
    <p>Turning off certificate checking is insecure. Use this only against known
    hosts with self-signed certificates in a development or lab environment.
    Never use in production.</p>
  </div>
</div>

Set `NODE_TLS_REJECT_UNAUTHORIZED` to `0` before starting Node-RED.

<ul class="nav nav-tabs" id="tls-off-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#tls-off-ps" aria-controls="tls-off-ps" role="tab" data-toggle="tab">PowerShell</a></li>
  <li role="presentation"><a href="#tls-off-cmd" aria-controls="tls-off-cmd" role="tab" data-toggle="tab">Command Prompt</a></li>
  <li role="presentation"><a href="#tls-off-nix" aria-controls="tls-off-nix" role="tab" data-toggle="tab">Linux / macOS</a></li>
</ul>
<div class="tab-content" style="padding-top:15px">
  <div role="tabpanel" class="tab-pane active" id="tls-off-ps">
    <pre><code class="language-powershell">$env:NODE_TLS_REJECT_UNAUTHORIZED=0; node-red</code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="tls-off-cmd">
    <pre><code class="language-batch">set NODE_TLS_REJECT_UNAUTHORIZED=0
node-red</code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="tls-off-nix">
    <pre><code class="language-bash">NODE_TLS_REJECT_UNAUTHORIZED=0 node-red</code></pre>
  </div>
</div>

---

## Verify Release Artifacts

Each release includes:

- `node-red-contrib-metasys-rest-<version>.tgz` — the npm package tarball
- `SHA256SUMS` — SHA-256 checksum for the tarball

This verification confirms that the `.tgz` file you downloaded has the same
SHA-256 hash as the value listed in `SHA256SUMS`. It verifies file integrity
only and does not validate authenticity or provenance.

<ul class="nav nav-tabs" id="verify-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#verify-mac" aria-controls="verify-mac" role="tab" data-toggle="tab">macOS</a></li>
  <li role="presentation"><a href="#verify-linux" aria-controls="verify-linux" role="tab" data-toggle="tab">Linux</a></li>
  <li role="presentation"><a href="#verify-win" aria-controls="verify-win" role="tab" data-toggle="tab">Windows</a></li>
</ul>
<div class="tab-content" style="padding-top:15px">
  <div role="tabpanel" class="tab-pane active" id="verify-mac">
    <p>Download both files into a folder, open a terminal, change to that folder, then run:</p>
    <pre><code class="language-bash">shasum -a 256 -c SHA256SUMS</code></pre>
    <p>A successful result looks like:</p>
    <pre><code class="language-bash">node-red-contrib-metasys-rest-&lt;version&gt;.tgz: OK</code></pre>
    <p>If the result shows <code>FAILED</code>, do not install the tarball. Re-download the file and try again.</p>
  </div>
  <div role="tabpanel" class="tab-pane" id="verify-linux">
    <p>Download both files into a folder, open a terminal, change to that folder, then run:</p>
    <pre><code class="language-bash">sha256sum -c SHA256SUMS</code></pre>
    <p>A successful result looks like:</p>
    <pre><code class="language-bash">node-red-contrib-metasys-rest-&lt;version&gt;.tgz: OK</code></pre>
    <p>If the result shows <code>FAILED</code>, do not install the tarball. Re-download the file and try again.</p>
  </div>
  <div role="tabpanel" class="tab-pane" id="verify-win">
    <p>Download both files into a folder. Open PowerShell, change to that folder, then:</p>
    <p><strong>1. View the expected hash:</strong></p>
    <pre><code class="language-powershell">Get-Content .\SHA256SUMS</code></pre>
    <p><strong>2. Compute the hash of the tarball:</strong></p>
    <pre><code class="language-powershell">(Get-FileHash .\node-red-contrib-metasys-rest-&lt;version&gt;.tgz -Algorithm SHA256).Hash</code></pre>
    <p>Compare the two values — they must match (case-insensitive). If they do not match, do not install the tarball.</p>
  </div>
</div>
