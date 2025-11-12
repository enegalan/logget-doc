# Quick Start

Get up and running with Logget in minutes. This guide covers the most common use cases and options.

## Basic Usage

### Capture Console Logs

```bash
logget --logs https://example.com
```

### Capture Network Requests

```bash
logget --network https://example.com
```

### Capture Both

```bash
logget --logs --network https://example.com
```

## Output Formats

### JSON Output

```bash
logget --logs --network --json https://example.com
```

### CSV Output

```bash
logget --logs --network --csv https://example.com
```

### HAR Output

```bash
logget --network --har https://example.com
```

### YAML Output

```bash
logget --logs --network --yaml https://example.com
```

## File Operations

### Save to File

```bash
logget --logs --output results.txt https://example.com
```

### Append to File

```bash
logget --logs --output results.txt --append https://example.com
```

### JSON Output to File

```bash
logget --logs --json --output results.json https://example.com
```

### YAML Output to File

```bash
logget --logs --yaml --output results.yaml https://example.com
```

## Authentication

### Custom Headers

```bash
logget --logs --header "Authorization: Bearer token" https://example.com
```

### Multiple Headers

```bash
logget --logs --header "Authorization: Bearer token" --header "X-Custom: value" https://example.com
```

### Headers from File

Create `headers.txt`:
```
Authorization: Bearer token
X-Custom-Header: value
# Comments are ignored
```

Use it:
```bash
logget --logs --header headers.txt https://example.com
```

### Cookies

```bash
logget --logs --cookie "session_id=abc123" https://example.com
```

### Cookies from File

Create `cookies.txt`:
```
session_id=abc123
user_token=xyz789
pref=dark_mode; domain=example.com
```

Use it:
```bash
logget --logs --cookie cookies.txt https://example.com
```

## Real-time Streaming

### Stream Console Logs

```bash
logget -f --logs https://example.com
```

### Stream Network Requests

```bash
logget -f --network https://example.com
```

### Stream Both

```bash
logget -f --logs --network https://example.com
```

### Custom Refresh Interval

```bash
logget -f --logs --refresh 500 https://example.com
```

### Stream with Filtering

```bash
logget -f --logs --filter "ERROR|WARN" https://example.com
```

## Filtering

### Filter by Status Code

```bash
logget --network --status "^2..$" https://example.com
logget --network --status "^(200|204)$" https://example.com
```

### Filter by Domain

```bash
logget --network --domain "^api\\.example\\.com$" https://example.com
logget --network --domain "(.*\\.)?example\\.com$" https://example.com
```

### Filter by MIME Type

```bash
logget --network --mime "^application/(json|javascript)$" https://example.com
```

### Filter by Size

```bash
logget --network --min-size 1024 --max-size 102400 https://example.com
```

### Filter by Resource Type

```bash
logget --network --xhr https://example.com
logget --network --img https://example.com
logget --network --script --css https://example.com
```

## Timing Configuration

### Custom Timeout

```bash
logget --logs --timeout 60 https://example.com
```

### Custom Wait Time

Wait time in milliseconds after page load:

```bash
logget --logs --wait 5000 https://example.com
```

## Custom Fingerprints Rotation Interval
```bash
logget --fingerprint-interval 3000 https://example.com
```

## Development Options

### Skip SSL Verification

For local development servers with self-signed certificates:

```bash
logget -k --logs https://localhost:8080
```

### Quiet Mode

Suppress progress messages:

```bash
logget --quiet --logs --network https://example.com
```

## Complete Example

A comprehensive example combining multiple features:

```bash
logget \
  --logs \
  --network \
  --json \
  --output results.json \
  --header "Authorization: Bearer token" \
  --cookie "session_id=abc123" \
  --timeout 60 \
  --wait 5000 \
  https://example.com
```

This command:
- Captures console logs and network requests
- Outputs in JSON format
- Saves to `results.json`
- Includes authentication headers and cookies
- Waits up to 60 seconds for page load
- Waits 5 seconds after page load

## Next Steps

- Explore the [Command Reference](../commands/overview) for all available options
- Learn about [Output Formats](../output-formats/json) in detail
