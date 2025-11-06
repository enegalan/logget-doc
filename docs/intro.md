# Introduction

**Logget** is a command-line tool that extracts browser console logs and network data from web pages using an embedded Chromium browser.

## Overview

Logget enables you to capture and analyze web application behavior without manual browser inspection. It automates the process of monitoring console output and network activity, making it ideal for debugging, testing, and monitoring web applications.

## Key Features

### Data Collection
- **Console Logs**: Capture all browser console messages
- **Network Monitoring**: Track HTTP requests with detailed headers, status codes, and timing metrics
- **Performance Metrics**: Comprehensive timing data including TTFB, DNS, SSL, and connection times

### Output Formats
- **JSON**: Structured data for programmatic processing
- **CSV**: Spreadsheet-friendly format for analysis
- **HAR**: HTTP Archive format compatible with browser DevTools
- **YAML**: Human-readable data serialization format

### Advanced Capabilities
- **Real-time Streaming**: Monitor logs and requests as they occur
- **Flexible Filtering**: Filter by status code, domain, MIME type, size, and resource type
- **Custom Headers & Cookies**: Support for authentication and custom request headers
- **File Operations**: Write output to files with append mode support
- **Fingerprint Rotation**: Prevent tracking by rotating browser fingerprints
- **SSL Support**: Configure SSL certificate verification for development environments

### Cross-Platform
Works seamlessly on Windows, Linux, and macOS with no browser installation required.

## Quick Example

```bash
# Capture console logs and network requests
logget --logs --network https://example.com

# Output in JSON format
logget --logs --network --json https://example.com

# Stream logs in real-time
logget -f --logs https://example.com
```

## Use Cases

- **Web Development**: Debug JavaScript applications and API interactions
- **Testing & QA**: Verify network requests and console output in automated tests
- **Security Analysis**: Inspect network traffic and JavaScript execution patterns
- **Logging**: Create structured log files with timestamps for analysis

## Next Steps

- [Install Logget](getting-started/installation) - Get started with installation
- [Quick Start Guide](getting-started/quick-start) - Learn the basics
- [Command Reference](commands/overview) - Explore all available options
