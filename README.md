# gitignore-gen ⚡

Auto-generate `.gitignore` files based on your project type. Zero configuration needed.

## Features

✨ **Auto-detection** - Automatically detects your project type (Node.js, Python, C++, Go, Rust, Java)
✨ **Manual override** - Specify project type with `-t` flag
✨ **One command** - Generate `.gitignore` in seconds
✨ **Production-ready** - Comprehensive templates for each language

## Installation

```bash
npm install -g gitignore-gen
```

## Usage

### Auto-detect project type
```bash
gitignore-gen
```

### Specify project type manually
```bash
gitignore-gen -t node
```

### Specify output file
```bash
gitignore-gen -o .gitignore
```

### Supported project types
- `node` - Node.js/JavaScript
- `python` - Python
- `cpp` - C++
- `go` - Go
- `rust` - Rust
- `java` - Java

## Examples

```bash
# In a Node.js project
gitignore-gen
# Output: ✓ Detected: node
#         ✅ Generated .gitignore for node!

# In a Python project with custom output
gitignore-gen -t python -o gitignore.txt

# Force a specific type
gitignore-gen -t rust
```

## License

MIT
