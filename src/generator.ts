import fs from 'fs-extra';
import path from 'path';

export class GitignoreGenerator {
  private templates: Record<string, string> = {
    node: this.getNodeTemplate(),
    python: this.getPythonTemplate(),
    cpp: this.getCppTemplate(),
    go: this.getGoTemplate(),
    rust: this.getRustTemplate(),
    java: this.getJavaTemplate(),
  };

  async detectProjectType(dir: string): Promise<string> {
    const files = await fs.readdir(dir);

    // Check for Node.js
    if (files.includes('package.json') || files.includes('package-lock.json')) {
      return 'node';
    }

    // Check for Python
    if (
      files.includes('requirements.txt') ||
      files.includes('setup.py') ||
      files.includes('pyproject.toml') ||
      files.includes('Pipfile')
    ) {
      return 'python';
    }

    // Check for C++
    if (
      files.some((f) => f.endsWith('.cpp') || f.endsWith('.cc') || f.endsWith('.cxx'))
    ) {
      return 'cpp';
    }

    // Check for Go
    if (files.includes('go.mod') || files.includes('go.sum')) {
      return 'go';
    }

    // Check for Rust
    if (files.includes('Cargo.toml') || files.includes('Cargo.lock')) {
      return 'rust';
    }

    // Check for Java
    if (
      files.includes('pom.xml') ||
      files.includes('build.gradle') ||
      files.some((f) => f.endsWith('.java'))
    ) {
      return 'java';
    }

    return 'node'; // default
  }

  async generate(projectType: string, outputPath: string): Promise<void> {
    const template = this.templates[projectType.toLowerCase()];
    if (!template) {
      throw new Error(`Unknown project type: ${projectType}`);
    }
    await fs.writeFile(outputPath, template);
  }

  private getNodeTemplate(): string {
    return `# Dependencies
node_modules/
npm-debug.log*
yarn-error.log*
pnpm-debug.log*
pnpm-error.log*
lerna-debug.log*

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Build
dist/
build/
.next/
out/

# OS
.DS_Store
Thumbs.db
`;
  }

  private getPythonTemplate(): string {
    return `# Byte-compiled
__pycache__/
*.py[cod]
*$py.class
*.so
.Python

# Virtual environments
venv/
env/
ENV/
env.bak/
venv.bak/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Distribution
dist/
build/
*.egg-info/

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db
`;
  }

  private getCppTemplate(): string {
    return `# Compiled object files
*.o
*.obj
*.out

# Executables
*.exe
*.app
*.dll
*.so
*.dylib

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
CMakeCache.txt
CMakeFiles/

# Build
build/
dist/

# OS
.DS_Store
Thumbs.db
`;
  }

  private getGoTemplate(): string {
    return `# Binaries
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binaries
*.test

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db
`;
  }

  private getRustTemplate(): string {
    return `# Build artifacts
/target/
Cargo.lock

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db
`;
  }

  private getJavaTemplate(): string {
    return `# Compiled class file
*.class

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup

# Gradle
build/
.gradle/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db
`;
  }
}
