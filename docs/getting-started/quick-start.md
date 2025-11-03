# Quick Start

This guide will help you get started with logget in just a few minutes.

## Basic Examples

### Show Console Logs

```bash
logget --logs https://example.com
```

### Show Network Requests

```bash
logget --network https://example.com
```

### Show Both Logs and Network Data

```bash
logget --logs --network https://example.com
```

### Output in JSON Format

```bash
logget --logs --network --json https://example.com
```

### Output in CSV Format

```bash
logget --logs --network --csv https://example.com
```

### Output in HAR Format

```bash
logget --network --har https://example.com
```

## Write Output to a File

```bash
logget --logs --output results.txt https://example.com
```

### Write JSON Output to a File

```bash
logget --logs --json --output results.json https://example.com
```

### Write HAR Output to a File

```bash
logget --network --har --output network.har https://example.com
```

## Append Output to an Existing File

```bash
logget --logs --output results.txt --append https://example.com
```

### Append JSON Output to a File

```bash
logget --logs --json --output results.json --append https://example.com
```

## Set Custom Timeout

```bash
logget --logs --timeout 60 https://example.com
```

## Set Custom Wait Time After Page Load

Set wait time in milliseconds after page load:

```bash
logget --logs --wait 5000 https://example.com
```

## Add Custom Headers

```bash
logget --logs --header "Authorization: Bearer token" --header "X-Custom: value" https://example.com
```

### Add Headers from a File

Create `headers.txt`:
```
Authorization: Bearer token
X-Custom-Header: value
# Comments (lines starting with # are ignored)
```

Then use it:
```bash
logget --logs --header headers.txt https://example.com
```

## Set Cookies for Authenticated Requests

```bash
logget --logs --cookie "session_id=abc123" --cookie "user_token=xyz789" https://example.com
```

### Set Cookies from a File

Create `cookies.txt`:
```
session_id=abc123
user_token=xyz789
pref=dark_mode; domain=example.com
# Comments (lines starting with # are ignored)
```

Then use it:
```bash
logget --logs --cookie cookies.txt https://example.com
```

### Set Cookies with Additional Attributes

```bash
logget --logs --cookie "session_id=abc123; domain=.example.com; secure" --cookie "user_pref=dark_mode; path=/settings" https://example.com
```

### Mix Direct Values and Files

```bash
logget --logs --header "Authorization: Bearer token" --header headers.txt --cookie "session_id=abc123" --cookie cookies.txt https://example.com
```

## Suppress Progress Messages

```bash
logget --quiet --logs --network https://example.com
logget -q --logs --json https://example.com
```

## Real-time Streaming Examples

### Stream Browser Logs from a URL in Real-time

```bash
logget -f --logs https://example.com
```

### Stream Network Requests from a URL

```bash
logget -f --network https://example.com
```

### Stream Both Logs and Network Data

```bash
logget -f --logs --network https://example.com
```

### Stream with Custom Refresh Interval

```bash
logget -f --logs --refresh 500 https://example.com
```

### Stream to a File

```bash
logget -f --logs --output stream.log https://example.com
```

### Stream with JSON Output

```bash
logget -f --logs --json https://example.com
```

### Stream with Custom Headers and Cookies

```bash
logget -f --logs --header "Authorization: Bearer token" --cookie "session=abc123" https://example.com
```

### Stream with Filtering for ERROR Messages Only

```bash
logget -f --logs --filter "ERROR" https://example.com
```

### Stream with Filtering for Multiple Patterns

```bash
logget -f --logs --filter "ERROR|WARN" https://example.com
```

### Stream with Exclusion Patterns

```bash
logget -f --logs --exclude "DEBUG" https://example.com
```

### Stream with Filtering and JSON Output

```bash
logget -f --logs --filter "ERROR|WARN" --json --output errors.json https://example.com
```

## Skip SSL Verification

Skip SSL verification for local development servers:

```bash
logget -k --logs https://0.0.0.0:3030
logget -k --network https://localhost:8080
logget -k -f --logs --filter "ERROR" https://127.0.0.1:3000
```

## Complete Example

Here's a complete example that combines multiple features:

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

This command will:
- Capture console logs and network requests
- Output in JSON format
- Save to `results.json`
- Send a custom Authorization header
- Include a session cookie
- Wait up to 60 seconds for the page to load
- Wait 5 seconds after page load

## Next Steps

- Explore the [Command Reference](../commands/overview) for all available options
- Learn about [Output Formats](../output-formats/json) in detail
- Check out [Examples](../use-cases/examples) for more use cases
