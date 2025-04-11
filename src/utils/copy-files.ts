import * as fs from 'fs';
import * as path from 'path';
import { showLoading } from './show-loading.js';

export interface CopyFilesOptions {
  sourceDir: string;
  destDir: string;
}

export async function copyFiles({
  sourceDir,
  destDir,
}: CopyFilesOptions): Promise<void> {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory ${sourceDir} does not exist`);
  }

  console.log('Copying configuration files... ⌛️');
  const stopLoading = showLoading('Copying configuration files ⌛️');

  try {
    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      const stats = fs.lstatSync(sourcePath);

      if (stats.isDirectory()) {
        fs.cpSync(sourcePath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    }
    stopLoading();
    console.log('Configuration files copied! ✅');
  } catch (error) {
    stopLoading();
    throw new Error(
      `Failed to copy configuration files: ${(error as Error).message}`,
    );
  }
}
