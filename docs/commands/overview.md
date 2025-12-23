# Command Overview

Logget provides a comprehensive set of command-line options for capturing and analyzing web application logs and network requests.

## Basic Syntax

```bash
logget [flags] <url>
```

## Core Options

### Data Collection

- `--logs`, `-L`: Capture browser console logs
- `--network`, `-N`: Capture network HTTP requests

### Output Format

- `--json`, `-J`: Output in JSON format
- `--csv`: Output in CSV format
- `--har`: Output in HAR (HTTP Archive) format
- `--yaml`: Output in YAML format

:::warning
Only one output format can be specified at a time. You cannot combine multiple format options (e.g., `--json --csv` or `--yaml --har`).
:::

### Output Destination

- `--output`, `-o` `<file>`: Write to file instead of stdout
- `--append`, `-a`: Append to file instead of overwriting
- `--follow`, `-f`: Stream logs and network requests in real-time
- `--quiet`, `-q`: Suppress progress messages (errors and warnings still displayed)

### HTTP Options

- `--header`, `-H` `<header|file>`: Add custom HTTP headers (format: 'Key: Value') or filename
- `--cookie`, `-C` `<data|file>`: Set cookies (format: 'name=value' or 'name=value; domain=example.com') or filename
- `--user-agent`, `-A` `<name>`: Set User-Agent header (default: "logget/1.0")
- `--insecure`, `-k`: Skip SSL certificate verification

### Timing

- `--timeout`, `-T`: Set timeout in milliseconds (default: 60000)
- `--wait`, `-W`: Wait time in milliseconds after page load (default: 3000)

### Filtering

- `--filter` `<regex>`: Show only logs/requests matching regex pattern
- `--exclude` `<regex>`: Exclude logs/requests matching regex pattern
- `--status` `<regex>`: Filter by HTTP status code
- `--domain` `<regex>`: Filter by domain
- `--mime` `<regex>`: Filter by MIME type
- `--min-size` `<bytes>`: Minimum request size
- `--max-size` `<bytes>`: Maximum request size

### Resource Type Filtering

- `--xhr`: Only fetch/XHR requests
- `--document`: Only document requests
- `--css`: Only CSS requests
- `--script`: Only script requests
- `--font`: Only font requests
- `--img`: Only image requests
- `--media`: Only media requests
- `--manifest`: Only manifest requests
- `--socket`: Only WebSocket requests

### Advanced Options

- `--execute`, `-e`: Execute JavaScript code in the page context (supports inline code or file path)
- `--refresh`: Refresh interval in milliseconds for streaming (default: 100)
- `--no-rotate-fingerprints`: Disable fingerprint rotation
- `--fingerprint-interval`: Interval in milliseconds for fingerprint rotation (default: 5000)
- `--no-color`: Disable colored output
- `--verbose`, `-V`: Show detailed HTTP protocol information
- `--version`, `-v`: Show version information

## Next Steps

- See [Detailed Options](options) for complete option reference
- Learn about [Output Formats](../output-formats/json)
