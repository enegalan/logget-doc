# Installation

Logget is a cross-platform command-line tool available for Windows, Linux, and macOS. Choose the installation method that best fits your needs.

## Homebrew Installation (macOS)

The easiest way to install on macOS is using Homebrew:

```bash
brew tap enegalan/logget
brew install logget
```

## Linux and MacOS

### Prerequisites

The installation script requires:
- `curl` or `wget` (for downloading)
- `tar` (for extracting archives)
- `sudo` privileges (for installing to `/usr/local/bin`)

### System Dependencies for Chromium

Logget uses an embedded Chromium browser (automatically downloaded via `rod`) to capture logs and network data. Chromium requires certain system libraries to run. If you encounter errors like `cannot open shared object file` or `No such file or directory` when running logget, you may need to install these dependencies.

#### Ubuntu/Debian

Install the required libraries:

```bash
sudo apt-get update
sudo apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libatspi2.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxkbcommon0 \
  libxrandr2 \
  xdg-utils
```

#### CentOS/RHEL/Fedora

For CentOS/RHEL 7+ and Fedora:

```bash
sudo yum install -y \
  alsa-lib \
  atk \
  cups-libs \
  gtk3 \
  libdrm \
  libX11 \
  libXcomposite \
  libXdamage \
  libXext \
  libXfixes \
  libXrandr \
  libxkbcommon \
  libxshmfence \
  mesa-libgbm \
  nss \
  xorg-x11-fonts-100dpi \
  xorg-x11-fonts-75dpi \
  xorg-x11-utils
```

For Fedora 22+ (using dnf):

```bash
sudo dnf install -y \
  alsa-lib \
  atk \
  cups-libs \
  gtk3 \
  libdrm \
  libX11 \
  libXcomposite \
  libXdamage \
  libXext \
  libXfixes \
  libXrandr \
  libxkbcommon \
  libxshmfence \
  mesa-libgbm \
  nss \
  xorg-x11-fonts-100dpi \
  xorg-x11-fonts-75dpi \
  xorg-x11-utils
```

#### Alpine Linux

Alpine Linux uses musl libc, which requires additional packages:

```bash
apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont
```

Alternatively, if you prefer to use the Chromium downloaded by rod, install these dependencies:

```bash
apk add --no-cache \
  bash \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  ttf-dejavu
```

#### macOS

macOS typically has most dependencies pre-installed. If you encounter issues, ensure you have:

- Xcode Command Line Tools (install with: `xcode-select --install`)

#### Windows

Windows systems usually have all required dependencies pre-installed. No additional installation is typically needed.

For more information, see the [go-rod compatibility documentation](https://go-rod.github.io/#/compatibility?id=os).

### Installation

1. Download the installation script:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/enegalan/logget/main/scripts/install.sh -o install.sh
   ```

   Or using wget:
   ```bash
   wget https://raw.githubusercontent.com/enegalan/logget/main/scripts/install.sh -O install.sh
   ```

2. Make the script executable:
   ```bash
   chmod +x install.sh
   ```

3. Run the installation script:
   ```bash
   ./install.sh
   ```

   This will install the latest version of logget.

### Installing a Specific Version

To install a specific version, pass the version number as an argument:

```bash
./install.sh 2.2.5
```

The version should be in the format `X.Y.Z` (e.g., `2.2.5`).

### Updating

To update to the latest version, simply run the installation script again:

```bash
./install.sh
```

The script will detect if logget is already installed and prompt you to overwrite it.

### Uninstalling

To uninstall logget, use the `--uninstall` or `-u` flag:

```bash
./install.sh --uninstall
```

Or:

```bash
./install.sh -u
```

This will remove the binary from `/usr/local/bin`.

## Pre-built Binaries

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

## Next Steps

Once installed, proceed to the [Quick Start Guide](quick-start) to learn how to use Logget.
