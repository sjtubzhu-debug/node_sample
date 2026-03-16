# Node.js Version Testing Guide

## 🎯 Current Configuration

In `.github/workflows/ci.yml`, we test on:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

This means:
- **18.x** → Latest Node.js 18 (currently 18.20.8)
- **20.x** → Latest Node.js 20 (currently 20.x.x)

## 📊 What is Matrix Testing?

Matrix testing runs your tests on **multiple configurations** in parallel.

### Example: Current Setup

```
Your code is tested on:
├─ Node.js 18.x
│  ├─ Install dependencies
│  ├─ Run tests
│  └─ Build
│
└─ Node.js 20.x
   ├─ Install dependencies
   ├─ Run tests
   └─ Build
```

**Total CI jobs:** 2 (Frontend) + 2 (Backend) = **4 parallel jobs**

## 🔧 How to Modify Versions

### Add More Versions

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Add Node.js 22
```

### Test Only One Version

```yaml
strategy:
  matrix:
    node-version: [20.x]  # Only test on Node.js 20
```

### Test Specific Versions

```yaml
strategy:
  matrix:
    node-version: [18.20.8, 20.11.0]  # Exact versions
```

## 📚 Node.js Version Reference

### Active Versions (2026)

| Version | Status | LTS Name | Release | End of Life |
|---------|--------|----------|---------|-------------|
| **22.x** | Current | - | Apr 2024 | Apr 2027 |
| **20.x** | Active LTS | Iron | Apr 2023 | Apr 2026 |
| **18.x** | Active LTS | Hydrogen | Apr 2022 | Apr 2025 |

### Version Naming

- **18.x** = Any version in the 18 series (18.0.0 to 18.99.99)
- **18.20.x** = Any patch version of 18.20 (18.20.0 to 18.20.99)
- **18.20.8** = Exact version

## 🎯 Why Test Multiple Versions?

### ✅ Benefits

1. **Compatibility Assurance**
   - Ensure code works on different Node.js versions
   - Catch version-specific bugs early

2. **User Support**
   - Support users on different Node.js versions
   - Provide clear compatibility information

3. **Future-Proofing**
   - Test on newer versions before upgrading
   - Identify deprecation warnings

### ⚠️ Considerations

1. **CI Time**
   - More versions = longer CI time
   - Jobs run in parallel, so impact is minimal

2. **Maintenance**
   - Need to update versions periodically
   - Remove old, unsupported versions

## 📖 Common Configurations

### Minimal (Fastest)

```yaml
strategy:
  matrix:
    node-version: [20.x]
```

**Use when:**
- Small project
- Quick feedback needed
- Only targeting one Node.js version

### Recommended (Current)

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

**Use when:**
- Production application
- Need LTS support
- Balance between coverage and speed

### Comprehensive

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

**Use when:**
- Library/package development
- Maximum compatibility needed
- Testing future versions

### Enterprise

```yaml
strategy:
  matrix:
    node-version: [18.20.8, 20.11.0]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

**Use when:**
- Cross-platform support needed
- Exact version requirements
- Enterprise deployment

## 🔍 How to Check Installed Version

In GitHub Actions logs, look for:

```
Run actions/setup-node@v4
Attempting to download 18.x...
Acquiring 18.20.8 - x64 from ...
Successfully set up Node.js version 18.20.8
```

## 💡 Best Practices

### 1. Test on LTS Versions

```yaml
node-version: [18.x, 20.x]  # Both are LTS
```

### 2. Update Regularly

Remove old versions when they reach end-of-life:

```yaml
# Before (2024)
node-version: [16.x, 18.x, 20.x]

# After (2025, when 16.x is EOL)
node-version: [18.x, 20.x, 22.x]
```

### 3. Match Production

Test on the same version you use in production:

```yaml
# If production uses Node.js 20
node-version: [20.x]
```

### 4. Use .x for Flexibility

```yaml
node-version: [18.x]  # ✅ Gets latest 18.x automatically
# vs
node-version: [18.20.8]  # ❌ Locked to specific version
```

## 🚀 Advanced: Matrix with Multiple Dimensions

Test on multiple Node.js versions AND operating systems:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
    os: [ubuntu-latest, windows-latest]
```

This creates **4 jobs**:
- Ubuntu + Node.js 18.x
- Ubuntu + Node.js 20.x
- Windows + Node.js 18.x
- Windows + Node.js 20.x

## 📝 Your Current Setup

```yaml
Frontend CI:
  - Node.js 18.x ✅
  - Node.js 20.x ✅

Backend CI:
  - Node.js 18.x ✅
  - Node.js 20.x ✅

Total: 4 parallel jobs
```

## 🔗 Resources

- [Node.js Release Schedule](https://nodejs.org/en/about/releases/)
- [GitHub Actions setup-node](https://github.com/actions/setup-node)
- [Node.js Version Manager (nvm)](https://github.com/nvm-sh/nvm)

---

**Summary:** Testing on 18.x and 20.x ensures your app works on the two most recent LTS versions of Node.js, covering the majority of production environments.

