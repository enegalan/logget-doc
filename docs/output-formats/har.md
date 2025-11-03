# HAR Output Format

HAR (HTTP Archive) format is a standard format for storing HTTP request/response data. HAR files can be analyzed with browser DevTools, HAR viewers, or other analysis tools.

## Usage

```bash
# Output HAR to stdout
logget --har --network https://example.com

# Output HAR to file
logget --har --network --output network.har https://example.com
```

**Note:** HAR format only includes network data. Use `--network` with `--har`.

## HAR Structure

HAR files follow the HTTP Archive specification (version 1.2). The structure is:

```json
{
  "log": {
    "version": "1.2",
    "creator": {
      "name": "logget",
      "version": "2.0"
    },
    "pages": [...],
    "entries": [
      {
        "request": {...},
        "response": {...},
        "timings": {...},
        "cache": {...},
        "time": 123.45,
        "startedDateTime": "2024-10-31T23:00:00.000Z"
      }
    ]
  }
}
```

## HAR Schema

### Root Object

- **`log`** (object, required): The log object containing all HAR data

### Log Object

- **`version`** (string, required): HAR format version (e.g., `"1.2"`)
- **`creator`** (object, required): Information about the tool that created the HAR
  - **`name`** (string): Tool name (e.g., `"logget"`)
  - **`version`** (string): Tool version (e.g., `"2.0"`)
- **`pages`** (array, optional): Array of page objects representing pages loaded
- **`entries`** (array, required): Array of entry objects representing HTTP requests/responses

### Page Object

Represents a page load:

```json
{
  "startedDateTime": "2024-10-31T23:00:00.000Z",
  "id": "page_1",
  "title": "Example Domain",
  "pageTimings": {
    "onContentLoad": 123.45,
    "onLoad": 234.56,
    "onDOMContentLoaded": 112.34
  }
}
```

- **`startedDateTime`** (string, required): Page load start time (ISO 8601)
- **`id`** (string, required): Unique page identifier
- **`title`** (string, required): Page title
- **`pageTimings`** (object, optional): Page timing information

### Entry Object

Represents a single HTTP request/response:

```json
{
  "startedDateTime": "2024-10-31T23:00:00.000Z",
  "time": 123.45,
  "request": {
    "method": "GET",
    "url": "https://example.com/",
    "httpVersion": "HTTP/1.1",
    "headers": [
      {"name": "User-Agent", "value": "Mozilla/5.0..."},
      {"name": "Accept", "value": "text/html"}
    ],
    "queryString": [],
    "cookies": [],
    "headersSize": 234,
    "bodySize": 0
  },
  "response": {
    "status": 200,
    "statusText": "OK",
    "httpVersion": "HTTP/1.1",
    "headers": [
      {"name": "Content-Type", "value": "text/html"},
      {"name": "Content-Length", "value": "1256"}
    ],
    "cookies": [],
    "content": {
      "size": 1256,
      "mimeType": "text/html"
    },
    "redirectURL": "",
    "headersSize": 345,
    "bodySize": 1256
  },
  "cache": {},
  "timings": {
    "blocked": 5.12,
    "dns": 5.34,
    "connect": 10.12,
    "ssl": 20.56,
    "send": 2.10,
    "wait": 30.45,
    "receive": 15.67
  },
  "serverIPAddress": "93.184.216.34",
  "connection": "443"
}
```

#### Entry Fields

- **`startedDateTime`** (string, required): Request start time (ISO 8601)
- **`time`** (float, required): Total request time in milliseconds
- **`request`** (object, required): Request object
- **`response`** (object, required): Response object
- **`cache`** (object, optional): Cache information
- **`timings`** (object, required): Timing information
- **`serverIPAddress`** (string, optional): Server IP address
- **`connection`** (string, optional): Connection identifier

#### Request Object

- **`method`** (string, required): HTTP method (GET, POST, etc.)
- **`url`** (string, required): Request URL
- **`httpVersion`** (string, required): HTTP version (e.g., "HTTP/1.1")
- **`headers`** (array, required): Array of header objects `{name, value}`
- **`queryString`** (array, optional): Array of query parameter objects `{name, value}`
- **`cookies`** (array, optional): Array of cookie objects
- **`headersSize`** (integer, optional): Size of request headers in bytes
- **`bodySize`** (integer, optional): Size of request body in bytes
- **`postData`** (object, optional): POST data (for POST requests)

#### Response Object

- **`status`** (integer, required): HTTP status code
- **`statusText`** (string, required): HTTP status text (e.g., "OK", "Not Found")
- **`httpVersion`** (string, required): HTTP version
- **`headers`** (array, required): Array of header objects `{name, value}`
- **`cookies`** (array, optional): Array of cookie objects
- **`content`** (object, required): Response content
  - **`size`** (integer): Content size in bytes
  - **`mimeType`** (string): MIME type
  - **`text`** (string, optional): Response body text (may be truncated)
- **`redirectURL`** (string, optional): Redirect URL if applicable
- **`headersSize`** (integer, optional): Size of response headers in bytes
- **`bodySize`** (integer, optional): Size of response body in bytes

#### Timings Object

All timing values are in milliseconds:

- **`blocked`** (float): Time spent in queue
- **`dns`** (float): DNS lookup time
- **`connect`** (float): Connection establishment time
- **`ssl`** (float): SSL/TLS handshake time (HTTPS only)
- **`send`** (float): Time to send request
- **`wait`** (float): Wait time (server processing) - TTFB
- **`receive`** (float): Time to receive response

**Note:** `-1` indicates that the timing information is not available.

## Example HAR File

```json
{
  "log": {
    "version": "1.2",
    "creator": {
      "name": "logget",
      "version": "2.0"
    },
    "pages": [
      {
        "startedDateTime": "2024-10-31T23:00:00.000Z",
        "id": "page_1",
        "title": "Example Domain",
        "pageTimings": {
          "onContentLoad": 123.45,
          "onLoad": 234.56
        }
      }
    ],
    "entries": [
      {
        "startedDateTime": "2024-10-31T23:00:00.000Z",
        "time": 123.45,
        "request": {
          "method": "GET",
          "url": "https://example.com/",
          "httpVersion": "HTTP/1.1",
          "headers": [
            {"name": "User-Agent", "value": "Mozilla/5.0..."},
            {"name": "Accept", "value": "text/html,application/xhtml+xml"}
          ],
          "queryString": [],
          "cookies": [],
          "headersSize": 234,
          "bodySize": 0
        },
        "response": {
          "status": 200,
          "statusText": "OK",
          "httpVersion": "HTTP/1.1",
          "headers": [
            {"name": "Content-Type", "value": "text/html; charset=UTF-8"},
            {"name": "Content-Length", "value": "1256"}
          ],
          "cookies": [],
          "content": {
            "size": 1256,
            "mimeType": "text/html"
          },
          "redirectURL": "",
          "headersSize": 345,
          "bodySize": 1256
        },
        "cache": {},
        "timings": {
          "blocked": 5.12,
          "dns": 5.34,
          "connect": 10.12,
          "ssl": 20.56,
          "send": 2.10,
          "wait": 30.45,
          "receive": 15.67
        }
      }
    ]
  }
}
```

## Viewing HAR Files

### Browser DevTools

1. Open Chrome/Edge DevTools (F12)
2. Go to Network tab
3. Click the "Import HAR file" button (or right-click → Load HAR)
4. Select your HAR file

### Online HAR Viewers

- [HAR Viewer](https://toolbox.googleapps.com/apps/har_analyzer/)
- [HAR Analyzer](https://www.softwareishard.com/har/viewer/)
- [HAR Analyzer Online](https://toolbox.googleapps.com/apps/har_analyzer/)

### Using Python

```python
import json

with open('network.har', 'r') as f:
    har_data = json.load(f)

for entry in har_data['log']['entries']:
    request = entry['request']
    response = entry['response']
    print(f"{request['method']} {request['url']} - {response['status']}")
    print(f"  Time: {entry['time']}ms")
    print(f"  Size: {response['content']['size']} bytes")
```

## Use Cases

### Performance Analysis

HAR files are excellent for performance analysis:

```bash
# Capture network data
logget --har --network --output performance.har https://example.com

# Analyze in browser DevTools or HAR viewer
```

### Debugging Network Issues

Save HAR files for debugging:

```bash
# Save HAR with custom headers
logget --har --network --header "Authorization: Bearer token" --output debug.har https://api.example.com
```

### Sharing Network Traces

HAR files can be easily shared with team members:

```bash
# Generate HAR file
logget --har --network --output trace.har https://example.com

# Share trace.har with your team
```

### Automated Analysis

Process HAR files programmatically:

```python
import json

def analyze_har(har_file):
    with open(har_file, 'r') as f:
        har = json.load(f)
    
    entries = har['log']['entries']
    
    # Find slow requests
    slow_requests = [e for e in entries if e['time'] > 1000]
    
    # Find failed requests
    failed_requests = [e for e in entries if e['response']['status'] >= 400]
    
    # Calculate total size
    total_size = sum(e['response']['content']['size'] for e in entries)
    
    return {
        'total_requests': len(entries),
        'slow_requests': len(slow_requests),
        'failed_requests': len(failed_requests),
        'total_size': total_size
    }

result = analyze_har('network.har')
print(result)
```

## Limitations

- HAR format only includes network data (not console logs)
- Response bodies may be truncated or omitted for large responses
- Some timing information may not be available for all requests
- HAR files can be large for pages with many resources

## Best Practices

1. **Use with Network Only**: Remember to use `--network` with `--har`
2. **File Size**: HAR files can grow large; consider filtering if needed
3. **Privacy**: HAR files may contain sensitive data; be careful when sharing
4. **Analysis Tools**: Use browser DevTools or HAR viewers for visual analysis
5. **Automation**: Use HAR format for automated analysis workflows

