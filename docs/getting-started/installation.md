# Installation

Logget is a cross-platform command-line tool that works on Windows, Linux, and macOS. This guide covers different installation methods.

## Prerequisites

- No browser installation required (uses embedded Chromium)
- For building from source: Go 1.21 or later

## Pre-built Binaries

### Download from GitHub Releases

Visit the [GitHub Releases page](https://github.com/enegalan/logget/releases) and download the appropriate binary for your platform:

- **Linux**: `logget-linux-amd64` or `logget-linux-arm64`
- **macOS**: `logget-darwin-amd64` or `logget-darwin-arm64`
- **Windows**: `logget-windows-amd64.exe` or `logget-windows-arm64.exe`

### Installation Steps

#### Linux/macOS

1. Download the binary for your platform
2. Make it executable:
   ```bash
   chmod +x logget-linux-amd64
   ```
3. Move it to a directory in your PATH (optional but recommended):
   ```bash
   sudo mv logget-linux-amd64 /usr/local/bin/logget
   ```
4. Verify installation:
   ```bash
   logget --version
   ```

#### Windows

1. Download the Windows executable (`logget-windows-amd64.exe`)
2. Rename it to `logget.exe` (optional)
3. Add it to your PATH or place it in a directory you can access from the command line
4. Verify installation:
   ```cmd
   logget --version
   ```

## Building from Source

### Prerequisites

- [Go](https://golang.org/dl/) 1.21 or later installed
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

3. Build for your current platform:
   ```bash
   go build -o logget .
   ```

4. Or use the Makefile:
   ```bash
   make build
   ```

### Cross-Platform Build

Build for all supported platforms:

```bash
make build-all
```

Or use the build script directly:

```bash
./scripts/build.sh
```

This creates binaries for:
- Linux (amd64, arm64)
- macOS (amd64, arm64)
- Windows (amd64, arm64)

## Verify Installation

After installation, verify that logget is working correctly:

```bash
logget --version
```

You should see the version number printed.

## Troubleshooting

### Command not found

If you get a "command not found" error:

1. **Check if the binary is in your PATH**: 
   ```bash
   which logget  # Linux/macOS
   where logget  # Windows
   ```

2. **Add to PATH**: Make sure the directory containing `logget` is in your system's PATH environment variable.

3. **Use full path**: You can always run logget using its full path:
   ```bash
   /path/to/logget --version
   ```

### Permission Denied (Linux/macOS)

If you get a permission denied error:

```bash
chmod +x logget
```

### Windows Security Warning

On Windows, you may see a security warning when running the executable. This is normal for unsigned binaries. Click "More info" and then "Run anyway" if you trust the source.

## Next Steps

Once installed, check out the [Quick Start Guide](quick-start) to learn how to use logget.

