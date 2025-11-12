# Command Options Reference

Complete reference for all logget command-line options.

## Data Collection Options

### `--logs`, `-L`

Capture browser console logs.

**Usage:**
```bash
logget --logs https://example.com
```

**Captures:**
- `console.log()` messages → `LOG` level
- `console.info()` messages → `INFO` level
- `console.warn()` messages → `WARN` level
- `console.error()` messages → `ERROR` level
- `console.debug()` messages → `DEBUG` level

### `--network`, `-N`

Capture network HTTP requests and responses.

**Usage:**
```bash
logget --network https://example.com
```

**Captures:**
- Request method with URL
- Response status code, headers, MIME type
- Resource type (Document, XHR, Image, Script, Stylesheet, Font, Media, Manifest, WebSocket, Other)
- Response size
- Detailed timing metrics

## Output Format Options

:::warning
Only one output format can be specified at a time. You cannot combine multiple format options (e.g., `--json --csv` or `--yaml --har`).
:::

### `--json`, `-J`

Output data in [JSON](https://enegalan.github.io/logget-doc/docs/output-formats/json) format.

**Usage:**
```bash
logget --json --logs --network https://example.com
```

### `--csv`

Output data in [CSV](https://enegalan.github.io/logget-doc/docs/output-formats/csv) (Comma-Separated Values) format.

**Usage:**
```bash
logget --csv --logs --network https://example.com
```

### `--har`

Output network data in [HAR](https://enegalan.github.io/logget-doc/docs/output-formats/har) (HTTP Archive) format.

**Usage:**
```bash
logget --har --network https://example.com
```

**Note:** HAR format only includes network data. Use `--network` with `--har`.

### `--yaml`

Output data in [YAML](https://enegalan.github.io/logget-doc/docs/output-formats/yaml) (YAML Ain't Markup Language) format.

**Usage:**
```bash
logget --yaml --logs --network https://example.com
```

## Output Destination Options

### `--output <file>`, `-o <file>`

Write output to a file instead of stdout.

**Usage:**
```bash
logget --logs --output results.txt https://example.com
```

**Examples:**
```bash
# JSON file
logget --logs --json --output logs.json https://example.com

# CSV file
logget --logs --csv --output logs.csv https://example.com

# HAR file
logget --network --har --output network.har https://example.com

# YAML file
logget --logs --yaml --output logs.yaml https://example.com
```

### `--append`, `-a`

Append output to an existing file instead of overwriting it.

**Usage:**
```bash
logget --logs --append --output results.txt https://example.com
```

### `--follow`, `-f`

Follow mode - stream output in real-time as logs and requests occur.

**Usage:**
```bash
logget -f --logs https://example.com
```

**Note:** In follow mode, output is streamed line by line. For CSV format, headers are written once at the start.

### `--quiet`, `-q`

Suppress progress messages, only show data (errors and warnings still displayed).

**Usage:**
```bash
logget -q --logs --network https://example.com
```

## HTTP Options

### `--header <header>`, `-H <header>`

Add a custom HTTP header. Can be used multiple times to add multiple headers. Also supports reading from files.

**Usage:**
```bash
logget --logs --header "Authorization: Bearer token123" https://api.example.com
```

**Examples:**
```bash
# Single header
logget --header "User-Agent: MyBot/1.0" https://example.com

# Multiple headers
logget \
  --header "Authorization: Bearer token123" \
  --header "X-Custom-Header: value" \
  https://api.example.com

# From file
logget --header headers.txt https://api.example.com
```

**Format:** `"Name: Value"` (quotes recommended for values with spaces)

**Header File Format:**
```
Authorization: Bearer token123
X-Custom-Header: value
Content-Type: application/json
# Comments (lines starting with # are ignored)
```

### `--cookie <cookie>`, `-C <cookie>`

Set a cookie. Can be used multiple times to set multiple cookies. Also supports reading from files.

**Usage:**
```bash
logget --logs --cookie "sessionid=abc123" https://example.com
```

**Examples:**
```bash
# Single cookie
logget --cookie "sessionid=abc123" https://example.com

# Multiple cookies
logget \
  --cookie "sessionid=abc123" \
  --cookie "csrf=xyz789" \
  https://example.com

# With additional attributes
logget --cookie "session_id=abc123; domain=.example.com; secure" https://example.com

# From file
logget --cookie cookies.txt https://example.com
```

**Format:** `"name=value"` or `"name=value; domain=example.com; secure"`

**Cookie File Format:**
```
session_id=abc123
user_token=xyz789
pref=dark_mode; domain=example.com
# Comments (lines starting with # are ignored)
```

### `--user-agent <name>`, `-A <name>`

Set User-Agent header (default: "logget/1.0").

**Usage:**
```bash
logget --user-agent "MyBot/1.0" https://example.com
```

### `--insecure`, `-k`

Skip SSL certificate verification (useful for self-signed certificates).

**Usage:**
```bash
logget -k --logs https://localhost:8080
```

## Timing Options

### `--timeout <milliseconds>`, `-T <milliseconds>`

Set timeout for page load in milliseconds. Default is 60 seconds.

**Usage:**
```bash
logget --timeout 30000 https://example.com
```

**Note:** The timeout applies to the initial page load. In follow mode, monitoring continues indefinitely.

### `--wait <milliseconds>`, `-W <milliseconds>`

Wait time in milliseconds after page load. Default is 3000ms.

**Usage:**
```bash
logget --wait 5000 https://example.com
```

## Filtering Options

### `--filter <regex>`

Show only logs/requests matching this regex pattern.

**Usage:**
```bash
logget -f --logs --filter "ERROR" https://example.com
```

**Examples:**
```bash
# Filter for WARN messages only
logget -f --logs --filter "WARN" https://example.com

# Filter for multiple patterns
logget -f --logs --filter "ERROR|WARN" https://example.com
```

### `--exclude <regex>`

Exclude logs/requests matching this regex pattern.

**Usage:**
```bash
logget -f --logs --exclude "DEBUG" https://example.com
```

### `--status <regex>`

Only include requests whose HTTP status code matches this regex.

**Usage:**
```bash
logget --network --status "^2..$" https://example.com
```

**Examples:**
```bash
# Only 4xx responses
logget --network --status "^4..$" https://example.com

# Only 200 or 204
logget --network --status "^(200|204)$" https://example.com
```

### `--domain <regex>`

Only include requests whose domain matches this regex.

**Usage:**
```bash
logget --network --domain "^api\\.example\\.com$" https://example.com
```

### `--mime <regex>`

Only include requests whose MIME type matches this regex.

**Usage:**
```bash
logget --network --mime "^application/(javascript|json)$" https://example.com
```

### `--min-size <bytes>`

Only include requests whose size is at least this many bytes.

**Usage:**
```bash
logget --network --min-size 1024 https://example.com
```

### `--max-size <bytes>`

Only include requests whose size is at most this many bytes.

**Usage:**
```bash
logget --network --max-size 10240 https://example.com
```

**Example:**
```bash
# Requests between 1KB and 100KB
logget --network --min-size 1024 --max-size 102400 https://example.com
```

## Request Type Filtering

### `--xhr`

Only include fetch/XHR requests.

**Usage:**
```bash
logget --network --xhr https://example.com
```

### `--document`

Only include Document requests.

**Usage:**
```bash
logget --network --document https://example.com
```

### `--css`

Only include CSS requests.

**Usage:**
```bash
logget --network --css https://example.com
```

### `--script`

Only include Script requests.

**Usage:**
```bash
logget --network --script https://example.com
```

### `--font`

Only include Font requests.

**Usage:**
```bash
logget --network --font https://example.com
```

### `--img`

Only include Image requests.

**Usage:**
```bash
logget --network --img https://example.com
```

### `--media`

Only include Media requests.

**Usage:**
```bash
logget --network --media https://example.com
```

### `--manifest`

Only include Manifest requests.

**Usage:**
```bash
logget --network --manifest https://example.com
```

### `--socket`

Only include WebSocket requests.

**Usage:**
```bash
logget --network --socket https://example.com
```

## Advanced Options

### `--refresh`

Refresh interval in milliseconds for real-time streaming (default: 100).

**Usage:**
```bash
logget -f --logs --refresh 500 https://example.com
```

### `--no-rotate-fingerprints`

Disable fingerprint rotation (default: enabled).

**Usage:**
```bash
logget --no-rotate-fingerprints --network https://example.com
```

### `--fingerprint-interval`

Interval in milliseconds for fingerprint rotation (default: 5000).

**Usage:**
```bash
logget --fingerprint-interval 2000 --network https://example.com
```

### `--no-color`

Disable colored output.

**Usage:**
```bash
logget --no-color --logs https://example.com
```

### `--verbose`, `-V`

Show detailed HTTP protocol information.

**Usage:**
```bash
logget -V --network https://example.com
```

### `--version`, `-v`

Show version information and exit.

**Usage:**
```bash
logget --version
```

### `--help`, `-h`

Show help message with all available options and exit.

**Usage:**
```bash
logget --help
```

## Option Combinations

### Common Patterns

**Basic monitoring:**
```bash
logget --logs --network https://example.com
```

**Save to file:**
```bash
logget --logs --network --output results.json https://example.com
```

**Authenticated request:**
```bash
logget \
  --header "Authorization: Bearer token123" \
  --cookie "sessionid=abc123" \
  https://api.example.com
```

**Real-time monitoring:**
```bash
logget -f --logs --network https://example.com
```

**CSV export:**
```bash
logget --csv --logs --network --output results.csv https://example.com
```

**HAR export:**
```bash
logget --har --network --output network.har https://example.com
```

**YAML export:**
```bash
logget --yaml --logs --network --output results.yaml https://example.com
```

## Next Steps

- Learn about [Output Formats](../output-formats/json)
