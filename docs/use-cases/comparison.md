# Comparison with curl

Logget and curl are both command-line tools for making HTTP requests, but they serve different purposes and have different capabilities.

## Feature Comparison

| Feature | curl | logget |
|---------|------|--------|
| HTTP requests | ✅ | ✅ |
| Custom headers | ✅ | ✅ |
| Cookie support | ✅ | ✅ |
| Response body | ✅ | ❌ |
| Console logs | ❌ | ✅ |
| Network monitoring | ❌ | ✅ |
| JavaScript execution | ❌ | ✅ |
| Browser automation | ❌ | ✅ |
| Real-time streaming | ❌ | ✅ |

## When to Use curl

Use curl when you need to:

- **Get response bodies**: curl outputs the full HTTP response body
- **Simple HTTP requests**: Quick API calls, downloading files
- **Low overhead**: curl is lightweight and fast
- **Server-side scripts**: curl is perfect for shell scripts and automation
- **REST API testing**: Simple API endpoint testing

### curl Examples

```bash
# Simple GET request
curl https://api.example.com/users

# POST request with JSON
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'

# Download file
curl -O https://example.com/file.zip

# Save response to file
curl -o response.html https://example.com
```

## When to Use logget

Use logget when you need to:

- **Monitor browser behavior**: Capture console logs and network requests from actual browser execution
- **Debug JavaScript applications**: See what JavaScript code is logging
- **Analyze web page performance**: Get detailed timing metrics
- **Test single-page applications**: Monitor dynamically loaded content
- **Security analysis**: Inspect network traffic and JavaScript execution
- **HAR files**: Generate HAR files for analysis tools
- **Real-time monitoring**: Stream logs and requests as they occur

### logget Examples

```bash
# Capture console logs and network requests
logget --logs --network https://example.com

# Monitor SPA in real-time
logget -f --logs --network https://spa.example.com

# Generate HAR file for analysis
logget --har --network --output network.har https://example.com

# Debug JavaScript errors
logget --json --logs https://example.com | jq 'select(.level == "ERROR")'
```

## Use Case Scenarios

### Scenario 1: Simple API Call

**curl is better:**
```bash
curl https://api.example.com/data
```

You just need the response body, curl is simpler and faster.

### Scenario 2: Testing REST API

**curl is better:**
```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'
```

API testing doesn't require browser execution.

### Scenario 3: Debugging Web Application

**logget is better:**
```bash
logget --logs --network --json https://app.example.com
```

You need to see what JavaScript is logging and what network requests are being made.

### Scenario 4: Performance Analysis

**logget is better:**
```bash
logget --har --network --output performance.har https://example.com
```

You need detailed timing metrics and HAR format for analysis tools.

### Scenario 5: Monitoring Single-Page Application

**logget is better:**
```bash
logget -f --logs --network https://spa.example.com
```

SPAs load content dynamically, you need real-time monitoring and JavaScript execution.

### Scenario 6: Downloading Files

**curl is better:**
```bash
curl -O https://example.com/file.zip
```

Simple file download doesn't require browser execution.

### Scenario 7: Testing API with Authentication

**Both work, but different use cases:**

**curl:**
```bash
curl -H "Authorization: Bearer token" https://api.example.com/data
```

**logget:**
```bash
logget --header "Authorization: Bearer token" --network https://api.example.com/data
```

Use curl for simple API calls, logget if you need to test how a web app handles the API call.

## Key Differences

### Execution Environment

- **curl**: Makes direct HTTP requests, no JavaScript execution
- **logget**: Uses embedded Chromium browser, executes JavaScript, renders pages

### Output

- **curl**: Returns HTTP response body
- **logget**: Returns console logs and network request metadata (not response bodies)

### Performance

- **curl**: Very fast, minimal overhead
- **logget**: Slower due to browser overhead, but provides browser context

### Use Cases

- **curl**: API testing, file downloads, simple HTTP requests
- **logget**: Web application debugging, performance analysis, JavaScript monitoring

## Complementary Use

curl and logget can be used together:

```bash
# Test API directly with curl
curl https://api.example.com/endpoint

# Test how web app uses the API with logget
logget --network --json https://app.example.com
```

## Summary

- **Use curl** for simple HTTP requests, API testing, and file downloads
- **Use logget** for web application debugging, JavaScript monitoring, and performance analysis
- **Both tools** are valuable and serve different purposes in your toolkit
