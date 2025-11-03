# CSV Output Format

CSV (Comma-Separated Values) format provides tabular data that's easy to import into spreadsheets and analyze.

## Usage

```bash
logget --csv --logs --network https://example.com
```

## Console Logs CSV

### Columns

1. **`timestamp`** (string): Timestamp in RFC3339 format (ISO 8601)
2. **`level`** (string): Log level in uppercase (`DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`, `LOG`, `TRACE`)
3. **`source`** (string): Source of the log (`browser` or `console`)
4. **`message`** (string): The log message content (may contain commas, properly escaped)

### Example

```csv
timestamp,level,source,message
2024-10-31T23:00:00Z,INFO,console,"Application started"
2024-10-31T23:00:01Z,ERROR,browser,"Failed to load resource"
2024-10-31T23:00:02Z,WARN,console,"Deprecated API used"
```

## Network Requests CSV

### Columns

1. **`timestamp`** (string): Timestamp in RFC3339 format (ISO 8601)
2. **`method`** (string): HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.)
3. **`url`** (string): Request URL (may contain commas, properly escaped)
4. **`status`** (string): HTTP status code as string (e.g., `"200"`, `"404"`)
5. **`resourceType`** (string): Resource type (e.g., `Document`, `XHR`, `Image`, `Script`, `Stylesheet`, `Font`, `Media`, `Manifest`, `WebSocket`, `Other`)
6. **`mimeType`** (string): MIME type of the response (e.g., `text/html`, `application/json`)
7. **`size`** (string): Size of the response in bytes as string (e.g., `"1234"`)
8. **`duration`** (string): Total request duration in milliseconds (e.g., `"123.45"`)
9. **`ttfb`** (string): Time to first byte in milliseconds (e.g., `"50.23"`)
10. **`connectTime`** (string): Connection time in milliseconds (e.g., `"10.12"`)
11. **`dnsTime`** (string): DNS lookup time in milliseconds (e.g., `"5.34"`)
12. **`sslTime`** (string): SSL/TLS handshake time in milliseconds (e.g., `"20.56"`)
13. **`sendTime`** (string): Time to send request in milliseconds (e.g., `"2.10"`)
14. **`waitTime`** (string): Wait time (server processing) in milliseconds (e.g., `"30.45"`)
15. **`receiveTime`** (string): Time to receive response in milliseconds (e.g., `"15.67"`)

### Example

```csv
timestamp,method,url,status,resourceType,mimeType,size,duration,ttfb,connectTime,dnsTime,sslTime,sendTime,waitTime,receiveTime
2024-10-31T23:00:00Z,GET,https://example.com/,200,Document,text/html,184,123.45,50.23,10.12,5.34,20.56,2.10,30.45,15.67
2024-10-31T23:00:01Z,GET,https://example.com/api/data,200,XHR,application/json,1234,234.56,100.12,15.23,8.45,25.67,3.20,50.34,20.45
2024-10-31T23:00:02Z,GET,https://example.com/favicon.ico,404,Other,text/html,230,45.67,20.34,5.12,3.45,0.00,1.50,10.23,5.12
```

## CSV Format Notes

### Headers

- Headers are always included in the first line
- Headers are written once at the start, even in follow mode

### Escaping

Values containing commas, quotes, or newlines are properly escaped according to RFC 4180:

- Fields containing commas, quotes, or newlines are wrapped in double quotes
- Double quotes within fields are escaped by doubling them (`""`)
- Example: `"Message with, comma and ""quotes""`

### Timestamps

- Timestamps use RFC3339 format (e.g., `2024-10-31T23:00:00Z`)
- Always in UTC timezone

### Empty Values

- Missing or unavailable values are represented as empty strings
- Example: SSL time for HTTP requests (non-HTTPS) will be empty

### Numeric Values

- All numeric values are represented as strings
- This prevents issues with leading zeros and ensures consistency
- Convert to numbers in your analysis tool if needed

## Usage Examples

### Save Console Logs to CSV

```bash
logget --csv --logs --output console_logs.csv https://example.com
```

### Save Network Requests to CSV

```bash
logget --csv --network --output network_requests.csv https://example.com
```

### Save Both to CSV

```bash
logget --csv --logs --network --output all_data.csv https://example.com
```

**Note:** When capturing both console logs and network requests, they will be interleaved in the CSV output. You may want to filter them in your analysis tool.

### Append to CSV File

```bash
logget --csv --append --output results.csv https://example.com
```

### Follow Mode

```bash
logget --csv --follow --logs --network https://example.com
```

In follow mode, CSV rows are streamed one at a time with the header written once at the start.

## Processing CSV Output

### Using Excel/Google Sheets

1. Save output to file:
   ```bash
   logget --csv --logs --network --output results.csv https://example.com
   ```

2. Open `results.csv` in Excel or Google Sheets

3. Use spreadsheet features for analysis:
   - Filter by level or status code
   - Sort by timestamp
   - Create charts and pivot tables

### Using Python

```python
import csv
import subprocess

# Run logget and save to CSV
with open('results.csv', 'w') as f:
    process = subprocess.Popen(
        ['logget', '--csv', '--logs', '--network', 'https://example.com'],
        stdout=f
    )
    process.wait()

# Read and analyze
with open('results.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if 'level' in row and row['level'] == 'ERROR':
            print(f"Error: {row['message']}")
        elif 'status' in row and row['status'] != '200':
            print(f"Failed request: {row['url']} - {row['status']}")
```

### Using awk

```bash
# Filter errors
logget --csv --logs https://example.com | awk -F',' 'NR==1 || $2=="ERROR"'

# Find slow requests (> 1000ms)
logget --csv --network https://example.com | awk -F',' 'NR==1 || ($8+0) > 1000'
```

### Using cut

```bash
# Extract URLs
logget --csv --network https://example.com | cut -d',' -f3

# Extract timestamps and messages
logget --csv --logs https://example.com | cut -d',' -f1,4
```

## Separating Console Logs and Network Requests

Since CSV output mixes console logs and network requests, you can separate them:

### Using grep

```bash
# Console logs only (has 'level' column)
logget --csv --logs --network https://example.com | grep -E "^(timestamp,level|.*,INFO|.*,ERROR|.*,WARN)"

# Network requests only (has 'method' column)
logget --csv --logs --network https://example.com | grep -E "^(timestamp,method|.*,GET|.*,POST)"
```

### Using Python

```python
import csv

with open('results.csv', 'r') as f:
    reader = csv.DictReader(f)
    console_logs = []
    network_requests = []
    
    for row in reader:
        if 'level' in row:
            console_logs.append(row)
        elif 'method' in row:
            network_requests.append(row)
    
    # Write separate files
    if console_logs:
        with open('console_logs.csv', 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=console_logs[0].keys())
            writer.writeheader()
            writer.writerows(console_logs)
    
    if network_requests:
        with open('network_requests.csv', 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=network_requests[0].keys())
            writer.writeheader()
            writer.writerows(network_requests)
```

## Best Practices

1. **Separate Outputs**: Consider running separate commands for console logs and network requests if you need them in separate files
2. **Use Headers**: Always include headers (default behavior) for easier analysis
3. **Handle Escaping**: Be aware that URLs and messages may contain commas and will be properly escaped
4. **Check Empty Values**: Some timing fields may be empty for certain request types
5. **Type Conversion**: Convert string numeric values to numbers in your analysis tool if needed

## Limitations

- CSV format mixes console logs and network requests when both are captured
- Complex nested data structures are flattened
- Less information than JSON format (some fields may be omitted)
- Escaping may make manual editing difficult for complex messages
