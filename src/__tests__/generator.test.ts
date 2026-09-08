import { GitignoreGenerator } from '../generator';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('GitignoreGenerator', () => {
  let generator: GitignoreGenerator;
  let tempDir: string;

  beforeEach(() => {
    generator = new GitignoreGenerator();
    tempDir = path.join(__dirname, 'temp-test-' + Date.now());
  });

  afterEach(async () => {
    if (await fs.pathExists(tempDir)) {
      await fs.remove(tempDir);
    }
  });

  test('should detect Node.js project', async () => {
    await fs.ensureDir(tempDir);
    await fs.writeFile(path.join(tempDir, 'package.json'), '{}');

    const type = await generator.detectProjectType(tempDir);
    expect(type).toBe('node');
  });

  test('should detect Python project', async () => {
    await fs.ensureDir(tempDir);
    await fs.writeFile(path.join(tempDir, 'requirements.txt'), '');

    const type = await generator.detectProjectType(tempDir);
    expect(type).toBe('python');
  });

  test('should generate Node gitignore', async () => {
    const outputPath = path.join(tempDir, '.gitignore');
    await generator.generate('node', outputPath);

    const content = await fs.readFile(outputPath, 'utf-8');
    expect(content).toContain('node_modules/');
  });

  test('should generate Python gitignore', async () => {
    const outputPath = path.join(tempDir, '.gitignore');
    await generator.generate('python', outputPath);

    const content = await fs.readFile(outputPath, 'utf-8');
    expect(content).toContain('__pycache__/');
  });

  test('should throw error for unknown type', async () => {
    const outputPath = path.join(tempDir, '.gitignore');
    await expect(generator.generate('unknown', outputPath)).rejects.toThrow();
  });
});
