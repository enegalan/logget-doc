# Installation

Logget is a cross-platform command-line tool available for Windows, Linux, and macOS. Choose the installation method that best fits your needs.

## Homebrew Installation (macOS)

The easiest way to install on macOS is using Homebrew:

```bash
brew tap enegalan/logget
brew install logget
```

### Updating

To update to the latest version:

```bash
brew upgrade logget
```

### Uninstalling

```bash
brew uninstall logget
```

## Pre-built Binaries

### Download from GitHub Releases

Visit the [GitHub Releases page](https://github.com/enegalan/logget/releases) and download the appropriate binary for your platform:

- **Linux**: `logget-linux-amd64` or `logget-linux-arm64`
- **macOS**: `logget-darwin-amd64` or `logget-darwin-arm64`
- **Windows**: `logget-windows-amd64.exe` or `logget-windows-arm64.exe`

### Linux/macOS Installation

1. Download the binary for your platform
2. Make it executable:
   ```bash
   chmod +x logget-linux-amd64
   ```
3. Move to a directory in your PATH (recommended):
   ```bash
   sudo mv logget-linux-amd64 /usr/local/bin/logget
   ```

### Windows Installation

1. Download the Windows executable (`logget-windows-amd64.exe`)
2. Rename to `logget.exe` (optional)
3. Add to PATH or place in an accessible directory

## Building from Source

### Prerequisites

- [Go](https://golang.org/dl/) 1.21 or later
- Git (to clone the repository)

### Build Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/enegalan/logget.git
   cd logget
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Build for your platform:
   ```bash
   go build -o logget .
   ```

Or use the Makefile:
```bash
make build
```

### Cross-Platform Build

Build for all supported platforms:

```bash
make build-all
```

This creates binaries for:
- Linux (amd64, arm64)
- macOS (amd64, arm64)
- Windows (amd64, arm64)

## Verify Installation

After installation, verify that Logget is working:

```bash
logget --version
```

You should see the version number printed.

## Troubleshooting

### Command Not Found

If you get a "command not found" error:

1. **Check if the binary is in your PATH**:
   ```bash
   which logget  # Linux/macOS
   where logget  # Windows
   ```

2. **Add to PATH**: Ensure the directory containing `logget` is in your system's PATH environment variable.

3. **Use full path**: You can always run Logget using its full path:
   ```bash
   /path/to/logget --version
   ```

### Permission Denied (Linux/macOS)

If you get a permission denied error:

```bash
chmod +x logget
```

### Windows Security Warning

On Windows, you may see a security warning when running unsigned binaries. Click "More info" and then "Run anyway" if you trust the source.

## Next Steps

Once installed, proceed to the [Quick Start Guide](quick-start) to learn how to use Logget.
