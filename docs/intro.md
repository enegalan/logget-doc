# Introduction

**Logget** is a command-line tool that extracts browser logs and network data from web pages using an embedded Chromium browser.

## Features

- **Console Log Collection**: Capture all console.log, console.error, console.warn, and console.info messages
- **Network Monitoring**: Track all HTTP requests (fetch, XMLHttpRequest) with headers, status codes, and timing
- **Cross-Platform**: Works on Windows, Linux, and macOS
- **No Chrome Required**: Uses embedded Chromium via `chromedp`
- **JSON Output**: Structured data output for easy parsing
- **File Output**: Write results to files instead of stdout
- **Append Mode**: Add output to existing files instead of overwriting
- **Custom Headers**: Add custom HTTP headers (supports files)
- **Cookie Support**: Set cookies for authenticated requests (supports files)
- **Configurable Timeout**: Set custom timeout values
- **Fingerprint Rotation**: Rotate navigator fingerprints (userAgent, platform, language, screen properties, WebGL, Canvas) to prevent tracking
- **Performance Metrics**: Detailed timing metrics (Duration, TTFB, Connect Time, DNS, SSL, Send, Wait, Receive times, Content Download Time, Queued Time, Total)
- **HAR Export**: Export network data in HAR (HTTP Archive) format
- **Real-time Streaming**: Stream logs and network requests in real-time with follow mode
- **Request Filtering**: Filter by status code, domain, MIME type, size, and resource type
- **CSV Output**: Export data in CSV format for spreadsheet analysis

## Use Cases

- **Web Development**: Debug JavaScript applications and API calls
- **Testing**: Verify network requests and console output
- **Monitoring**: Track application behavior and performance
- **Security Analysis**: Inspect network traffic and JavaScript execution
- **Automation**: Save results to files for batch processing and analysis
- **Logging**: Create organized log files with timestamps and structured data
- **AI Utility**: Allow your AI agents use this command for efficient debugging

## Quick Example

```bash
# Show console logs
logget --logs https://example.com

# Show network requests
logget --network https://example.com

# Show both logs and network data
logget --logs --network https://example.com

# Output in JSON format
logget --logs --network --json https://example.com

# Stream logs in real-time
logget -f --logs https://example.com
```

## Comparison with curl

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

## Next Steps

- [Install Logget](getting-started/installation) - Get started with installation
- [Quick Start Guide](getting-started/quick-start) - Learn the basics
- [Command Reference](commands/overview) - Explore all available commands and options

