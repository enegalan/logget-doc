# Examples

This page provides practical examples of using logget for various scenarios.

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

## File Output Examples

### Write Output to a File

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

### Append Output to an Existing File

```bash
logget --logs --output results.txt --append https://example.com
```

### Append JSON Output to a File

```bash
logget --logs --json --output results.json --append https://example.com
```

## Custom Headers Examples

### Add Custom Headers

```bash
logget --logs --header "Authorization: Bearer token" --header "X-Custom: value" https://example.com
```

### Add Headers from a File

Create `headers.txt`:
```
Authorization: Bearer token123
X-Custom-Header: value
Content-Type: application/json
# Comments (lines starting with # are ignored)
```

Then use it:
```bash
logget --logs --header headers.txt https://api.example.com
```

### Mix Direct Values and Files

```bash
logget --logs --header "Authorization: Bearer token" --header headers.txt https://api.example.com
```

## Cookie Examples

### Set Cookies for Authenticated Requests

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

## Request Type Filtering Examples

### Only XHR/fetch Requests

```bash
logget --network --xhr https://example.com
```

### Only Images

```bash
logget --network --img https://example.com
```

### Only Scripts and CSS

```bash
logget --network --script --css https://example.com
```

### Only WebSocket Traffic

```bash
logget --network --socket https://example.com
```

### Only JavaScript MIME Types

```bash
logget --network --mime "^application/(javascript|json)$" https://example.com
```

### Only 2xx Responses (regex)

```bash
logget --network --status "^2..$" https://example.com
```

### Only 200 or 204

```bash
logget --network --status "^(200|204)$" https://example.com
```

### Only Requests to a Specific Domain

```bash
logget --network --domain "^api\\.example\\.com$" https://example.com
```

### Requests to Subdomains of example.com

```bash
logget --network --domain "(.*\\.)?example\\.com$" https://example.com
```

### Only Requests Larger than 1KB

```bash
logget --network --min-size 1024 https://example.com
```

### Only Requests Smaller than 10KB

```bash
logget --network --max-size 10240 https://example.com
```

### Requests Between 1KB and 100KB

```bash
logget --network --min-size 1024 --max-size 102400 https://example.com
```

## Fingerprint Rotation Examples

### Fingerprint Rotation is Enabled by Default

```bash
logget --network https://example.com
```

### Rotate Fingerprints Every 2 Seconds

```bash
logget --fingerprint-interval 2000 --network https://example.com
```

### Rotate Fingerprints with Custom Interval and Stream to File

```bash
logget --fingerprint-interval 3000 -f --logs --output fingerprint.log https://example.com
```

### Disable Fingerprint Rotation

```bash
logget --no-rotate-fingerprints --network https://example.com
```

## Skip SSL Verification

### Skip SSL Verification for Local Development Servers

```bash
logget -k --logs https://0.0.0.0:3030
logget -k --network https://localhost:8080
logget -k -f --logs --filter "ERROR" https://127.0.0.1:3000
```

## Suppress Progress Messages

### Quiet Mode: Only Show Data

```bash
logget --quiet --logs --network https://example.com
logget -q --logs --json https://example.com
```

## Integration Examples

### With jq

Filter and process JSON output:

```bash
# Extract all URLs
logget --json --network https://example.com | jq -r '.url'

# Find slow requests
logget --json --network https://example.com | jq 'select(.duration > 1000)'

# Count errors
logget --json --logs https://example.com | jq '[select(.level == "ERROR")] | length'

# Group by status code
logget --json --network https://example.com | jq 'group_by(.status) | map({status: .[0].status, count: length})'
```

### With Python

```python
import json
import subprocess
import sys

def analyze_logs(url):
    cmd = ['logget', '--json', '--logs', '--network', url]
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, text=True)
    
    errors = []
    slow_requests = []
    
    for line in process.stdout:
        if line.strip():
            entry = json.loads(line)
            
            # Collect errors
            if entry.get('level') == 'ERROR':
                errors.append(entry)
            
            # Collect slow requests
            if entry.get('duration', 0) > 1000:
                slow_requests.append(entry)
    
    return {
        'errors': errors,
        'slow_requests': slow_requests
    }

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'https://example.com'
    results = analyze_logs(url)
    
    print(f"Found {len(results['errors'])} errors")
    print(f"Found {len(results['slow_requests'])} slow requests")
```

### With Node.js

```javascript
const { spawn } = require('child_process');

function analyzeLogs(url) {
  return new Promise((resolve, reject) => {
    const logget = spawn('logget', ['--json', '--logs', '--network', url]);
    const results = {
      errors: [],
      slowRequests: []
    };

    logget.stdout.on('data', (data) => {
      const lines = data.toString().split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          try {
            const entry = JSON.parse(line);
            
            if (entry.level === 'ERROR') {
              results.errors.push(entry);
            }
            
            if (entry.duration > 1000) {
              results.slowRequests.push(entry);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      });
    });

    logget.on('close', (code) => {
      resolve(results);
    });

    logget.on('error', (err) => {
      reject(err);
    });
  });
}

const url = process.argv[2] || 'https://example.com';
analyzeLogs(url).then(results => {
  console.log(`Found ${results.errors.length} errors`);
  console.log(`Found ${results.slowRequests.length} slow requests`);
});
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Monitor Website

on:
  schedule:
    - cron: '0 * * * *'  # Every hour

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Download logget
        run: |
          wget https://github.com/enegalan/logget/releases/latest/download/logget-linux-amd64
          chmod +x logget-linux-amd64
          sudo mv logget-linux-amd64 /usr/local/bin/logget
      
      - name: Run monitoring
        run: |
          logget \
            --logs \
            --network \
            --json \
            --output results.json \
            https://example.com
      
      - name: Check for errors
        run: |
          if jq -e '[.[] | select(.level == "ERROR")] | length > 0' results.json; then
            echo "Errors found!"
            exit 1
          fi
```

## Testing Examples

### Test API Endpoint

```bash
logget \
  --network \
  --header "Authorization: Bearer $API_TOKEN" \
  --json \
  --output api_test.json \
  https://api.example.com/endpoint

# Verify status code
jq 'select(.status != 200)' api_test.json
```

### Verify No Errors

```bash
# Fail if any errors found
logget --json --logs https://example.com | jq -e '[select(.level == "ERROR")] | length == 0'
```

### Check Performance

```bash
# Fail if any request takes longer than 2 seconds
logget --json --network https://example.com | jq -e '[select(.duration > 2000)] | length == 0'
```

## Tips and Best Practices

1. **Use JSON for Processing**: JSON format is best for programmatic processing
2. **Use CSV for Analysis**: CSV format is best for spreadsheet analysis
3. **Use HAR for Sharing**: HAR format is best for sharing with team members
4. **Save Output**: Always save output to files for later analysis
5. **Filter in Pipeline**: Use `jq`, `awk`, or other tools to filter output
6. **Set Appropriate Timeouts**: Adjust timeout based on page complexity
7. **Use Follow Mode for SPAs**: Follow mode is essential for single-page applications
8. **Separate Concerns**: Consider running separate commands for console logs and network requests if you need them separated
