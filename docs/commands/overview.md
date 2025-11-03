# Command Overview

Logget provides a comprehensive set of command-line options for capturing and analyzing web application logs and network requests.

## Basic Syntax

```bash
logget [flags] <url>
```

## Core Options

### Data Collection

- `--logs`, `-L`: Capture and display console logs
- `--network`, `-N`: Capture and display network requests

### Output Format

- `--json`, `-J`: Output results in JSON format
- `--csv`: Output results in CSV format
- `--har`: Output results in HAR (HTTP Archive) format

### Output Destination

- `--output`, `-o` `<filename>`: Write to file instead of stdout
- `--append`, `-a`: Append to file instead of overwriting
- `--follow`, `-f`: Stream logs and network requests in real-time
- `--quiet`, `-q`: Suppress progress messages, only show data (errors and warnings still displayed)

### HTTP Options

- `--header`, `-H` `<header|file>`: Add custom HTTP headers (format: 'Key: Value') or filename containing headers
- `--cookie`, `-C` `<data|filename>`: Set cookies (format: 'name=value' or 'name=value; domain=example.com') or filename containing cookies
- `--user-agent`, `-A` `<name>`: Set User-Agent header (default: "logget/1.0")
- `--insecure`, `-k`: Skip SSL certificate verification (useful for self-signed certificates)

### Timing

- `--timeout`, `-T`: Set timeout in seconds (default: 60)
- `--wait`, `-W`: Wait time in milliseconds after page load (default: 3000)

### Filtering Options

- `--filter` `<regex>`: Show only logs/requests matching this regex pattern
- `--exclude` `<regex>`: Exclude logs/requests matching this regex pattern
- `--status` `<regex>`: Only include requests whose HTTP status code matches this regex
- `--domain` `<regex>`: Only include requests whose domain matches this regex
- `--mime` `<regex>`: Only include requests whose MIME type matches this regex
- `--min-size` `<bytes>`: Only include requests whose size is at least this many bytes
- `--max-size` `<bytes>`: Only include requests whose size is at most this many bytes

### Request Type Filtering

- `--xhr`: Only include fetch/XHR requests
- `--document`: Only include Document requests
- `--css`: Only include CSS requests
- `--script`: Only include Script requests
- `--font`: Only include Font requests
- `--img`: Only include Image requests
- `--media`: Only include Media requests
- `--manifest`: Only include Manifest requests
- `--socket`: Only include WebSocket requests

### Advanced Options

- `--refresh`: Refresh interval in milliseconds for real-time streaming (default: 100)
- `--no-rotate-fingerprints`: Disable fingerprint rotation (default: enabled)
- `--fingerprint-interval`: Interval in milliseconds for fingerprint rotation (default: 5000)
- `--no-color`: Disable colored output
- `--verbose`, `-V`: Show detailed HTTP protocol information
- `--version`, `-v`: Show version information

## Examples

### Basic Usage

```bash
# Show console logs
logget --logs https://example.com

# Show network requests
logget --network https://example.com

# Show both logs and network data
logget --logs --network https://example.com
```

### Output Options

```bash
# Save to file
logget --logs --output results.txt https://example.com

# Append to file
logget --logs --append --output results.txt https://example.com

# Real-time streaming
logget -f --logs https://example.com

# JSON output
logget --logs --json --output results.json https://example.com

# CSV output
logget --logs --csv --output results.csv https://example.com

# HAR output
logget --network --har --output network.har https://example.com
```

### Authentication

```bash
# With custom header
logget --logs --header "Authorization: Bearer token123" https://api.example.com

# With cookies
logget --logs --cookie "sessionid=abc123" https://example.com

# Headers from file
logget --logs --header headers.txt https://api.example.com

# Cookies from file
logget --logs --cookie cookies.txt https://example.com
```

### Request Type Filtering

```bash
# Only XHR/fetch requests
logget --network --xhr https://example.com

# Only images
logget --network --img https://example.com

# Only scripts and CSS
logget --network --script --css https://example.com

# Only WebSocket traffic
logget --network --socket https://example.com
```

### Advanced Filtering

```bash
# Only JavaScript MIME types
logget --network --mime "^application/(javascript|json)$" https://example.com

# Only 2xx responses (regex)
logget --network --status "^2..$" https://example.com

# Only 200 or 204
logget --network --status "^(200|204)$" https://example.com

# Only requests to a specific domain
logget --network --domain "^api\\.example\\.com$" https://example.com

# Requests between 1KB and 100KB
logget --network --min-size 1024 --max-size 102400 https://example.com
```

### Real-time Streaming

```bash
# Stream browser logs
logget -f --logs https://example.com

# Stream network requests
logget -f --network https://example.com

# Stream with custom refresh interval
logget -f --logs --refresh 500 https://example.com

# Stream with filtering
logget -f --logs --filter "ERROR|WARN" https://example.com
```

### Fingerprint Rotation

```bash
# Fingerprint rotation is enabled by default (every 5 seconds)
logget --network https://example.com

# Rotate fingerprints every 2 seconds
logget --fingerprint-interval 2000 --network https://example.com

# Disable fingerprint rotation
logget --no-rotate-fingerprints --network https://example.com
```

## Next Steps

- See [Detailed Options](options) for complete option reference
- Learn about [Output Formats](../output-formats/json)
- Check out [Examples](../use-cases/examples)
