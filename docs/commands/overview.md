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

### Output Destination

- `--output`, `-o` `<filename>`: Write to file instead of stdout
- `--append`, `-a`: Append to file instead of overwriting
- `--follow`, `-f`: Stream logs and network requests in real-time
- `--quiet`, `-q`: Suppress progress messages (errors and warnings still displayed)

### HTTP Options

- `--header`, `-H` `<header|file>`: Add custom HTTP headers (format: 'Key: Value') or filename
- `--cookie`, `-C` `<data|filename>`: Set cookies (format: 'name=value' or 'name=value; domain=example.com') or filename
- `--user-agent`, `-A` `<name>`: Set User-Agent header (default: "logget/1.0")
- `--insecure`, `-k`: Skip SSL certificate verification

### Timing

- `--timeout`, `-T`: Set timeout in seconds (default: 60)
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

- `--refresh`: Refresh interval in milliseconds for streaming (default: 100)
- `--no-rotate-fingerprints`: Disable fingerprint rotation
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

# YAML output
logget --logs --yaml --output logs.yaml https://example.com
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

### Resource Type Filtering

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

# Only 2xx responses
logget --network --status "^2..$" https://example.com

# Only 200 or 204
logget --network --status "^(200|204)$" https://example.com

# Only requests to specific domain
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
- Check out [Use Cases](../use-cases/examples)
