# YAML Output Format

YAML provides structured data that's human-readable and easy to parse programmatically.

## Usage

```bash
# Explicit YAML output
logget --logs --network --yaml https://example.com
```

## Output Schemas

When using `--yaml`, logget outputs structured YAML data. The format depends on whether you're in follow mode (streaming) or batch mode.

### Batch Mode (Full Output)

In batch mode, the complete YAML output contains a single `OutputData` object:

```yaml
url: https://example.com
logs:
  - level: INFO
    message: Console log message
    time: "2024-10-31T23:00:00Z"
    source: console
network:
  - url: https://example.com/api/data
    method: GET
    status: 200
    headers:
      Content-Type: application/json
      Content-Length: "1234"
    timestamp: "2024-10-31T23:00:00Z"
    type: application/json
    size: 1234
    resourceType: XHR
duration: 3.456789s
```

### Follow Mode (Streaming)

In follow mode (`-f`), each log entry and network request is output as a separate YAML document (separated by `---`):

```yaml
level: INFO
message: Log message
time: "2024-10-31T23:00:00Z"
source: console
---
url: https://example.com
method: GET
status: 200
headers:
  Content-Type: text/html
timestamp: "2024-10-31T23:00:01Z"
type: text/html
size: 184
resourceType: Document
```

## Field Descriptions

### OutputData (Batch Mode Only)

- `url` (string): Visited URL
- `logs` (array, optional): Array of `LogEntry` objects
- `network` (array, optional): Array of `NetworkEntry` objects
- `duration` (string): Total time taken to load the page

### LogEntry

- `level` (string): Log level (`DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`, `LOG`, `TRACE`)
- `message` (string): The log message content
- `time` (string): Timestamp in RFC3339 format (ISO 8601)
- `source` (string): Source of the log (`"browser"` or `"console"`)

### NetworkEntry

- `url` (string): Request URL
- `method` (string): HTTP method (e.g., `GET`, `POST`, `PUT`, `DELETE`)
- `status` (integer): HTTP status code (e.g., 200, 404, 500)
- `headers` (object): Response headers as key-value pairs (string keys and values)
- `timestamp` (string): Timestamp in RFC3339 format (ISO 8601)
- `type` (string): MIME type of the response (e.g., `"text/html"`, `"application/json"`)
- `size` (integer): Size of the response in bytes
- `resourceType` (string): Resource type (e.g., `"Document"`, `"XHR"`, `"Image"`, `"Script"`, `"Stylesheet"`, `"Font"`, `"Media"`, `"Manifest"`, `"WebSocket"`, `"Other"`)
- `duration` (float, optional): Total request duration in milliseconds
- `durationFormatted` (string, optional): Formatted duration (e.g., `"123.45ms"` or `"1.23s"`)
- `timeToFirstByte` (float, optional): Time to first byte (TTFB) in milliseconds
- `timeToFirstByteFormatted` (string, optional): Formatted TTFB (e.g., `"50.23ms"` or `"0.50s"`)
- `connectTime` (float, optional): Connection establishment time in milliseconds
- `connectTimeFormatted` (string, optional): Formatted connect time
- `dnsLookupTime` (float, optional): DNS lookup time in milliseconds
- `dnsLookupTimeFormatted` (string, optional): Formatted DNS lookup time
- `sslTime` (float, optional): SSL/TLS handshake time in milliseconds (HTTPS only)
- `sslTimeFormatted` (string, optional): Formatted SSL time
- `sendTime` (float, optional): Time to send request in milliseconds
- `sendTimeFormatted` (string, optional): Formatted send time
- `waitTime` (float, optional): Wait time (server processing) in milliseconds
- `waitTimeFormatted` (string, optional): Formatted wait time
- `receiveTime` (float, optional): Time to receive response headers in milliseconds
- `receiveTimeFormatted` (string, optional): Formatted receive time
- `contentDownloadTime` (float, optional): Full content download time (body + headers) in milliseconds
- `contentDownloadTimeFormatted` (string, optional): Formatted content download time
- `queuedTime` (float, optional): Time from navigation start to request start in milliseconds
- `queuedTimeFormatted` (string, optional): Formatted queued time
- `requestStartTime` (float, optional): Request start time relative to navigation start in milliseconds
- `requestStartTimeFormatted` (string, optional): Formatted request start time
- `responseStartTime` (float, optional): Response start time relative to navigation start in milliseconds
- `responseStartTimeFormatted` (string, optional): Formatted response start time
- `total` (float, optional): Sum of all timing phases (Queued + DNS + Connect + SSL + Send + Wait + Receive + ContentDownload) in milliseconds
- `totalFormatted` (string, optional): Formatted total time (e.g., `"863.12ms"` or `"0.86s"`)

## Log Levels

Log levels correspond to console methods:
- `console.log()` → `"LOG"`
- `console.info()` → `"INFO"`
- `console.warn()` → `"WARN"`
- `console.error()` → `"ERROR"`
- `console.debug()` → `"DEBUG"`

## Resource Types

- `"Document"`: HTML documents
- `"XHR"`: XMLHttpRequest / Fetch API requests
- `"Image"`: Images (PNG, JPEG, GIF, etc.)
- `"Script"`: JavaScript files
- `"Stylesheet"`: CSS files
- `"Font"`: Web fonts
- `"Media"`: Audio/video files
- `"Manifest"`: Web app manifests
- `"WebSocket"`: WebSocket connections
- `"Other"`: Other resource types

## Output Format

### Multi-Document Format (Follow Mode)

In follow mode, each log entry and network request is output as a separate YAML document separated by `---`:

```yaml
level: INFO
message: App started
time: "2024-10-31T23:00:00Z"
source: console
---
url: https://example.com/
method: GET
status: 200
resourceType: Document
```

This format is:
- Easy to stream and process document by document
- Human-readable
- Compatible with YAML parsers that support multi-document streams

## Saving to File

```bash
# Save to file
logget --yaml --logs --network --output results.yaml https://example.com

# Append to file
logget --yaml --logs --network --append --output results.yaml https://example.com
```

## Follow Mode

In follow mode (`-f`), YAML documents are streamed separated by `---` as they occur:

```bash
logget -f --yaml --logs --network https://example.com
```

This allows real-time processing of logs and network requests.

## Examples

### Basic Console Logs

```bash
logget --yaml --logs https://example.com
```

Output (follow mode):
```yaml
level: INFO
message: Application started
time: "2024-10-31T23:00:00Z"
source: console
---
level: WARN
message: Deprecated API
time: "2024-10-31T23:00:01Z"
source: console
```

### Network Requests

```bash
logget --yaml --network https://example.com
```

Output (follow mode):
```yaml
url: https://example.com/
method: GET
status: 200
headers:
  Content-Type: text/html
timestamp: "2024-10-31T23:00:00Z"
type: text/html
size: 1256
resourceType: Document
---
url: https://example.com/api/data
method: GET
status: 200
headers:
  Content-Type: application/json
timestamp: "2024-10-31T23:00:01Z"
type: application/json
size: 456
resourceType: XHR
```

### Combined Output

```bash
logget --yaml --logs --network https://example.com
```

Output (follow mode, mixed console logs and network requests):
```yaml
level: INFO
message: App started
time: "2024-10-31T23:00:00Z"
source: console
---
url: https://example.com/
method: GET
status: 200
resourceType: Document
---
level: ERROR
message: API error
time: "2024-10-31T23:00:01Z"
source: console
---
url: https://example.com/api/data
method: GET
status: 500
resourceType: XHR
```
