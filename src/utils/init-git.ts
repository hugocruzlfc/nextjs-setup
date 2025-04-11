import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { showLoading } from './show-loading.js';

export interface InitGitOptions {
  destDir: string;
}

export async function initGit({ destDir }: InitGitOptions): Promise<void> {
  const gitDir = path.join(destDir, '.git');

  if (fs.existsSync(gitDir)) {
    console.log('Git repository already exists, skipping initialization... ✅');
    return;
  }

  console.log('Initializing Git repository... ⌛️');
  const stopLoading = showLoading('Initializing Git repository ⌛️');

  try {
    execSync('git init', { stdio: 'inherit', cwd: destDir });
    stopLoading();
    console.log('Git repository initialized! ✅');
  } catch (error) {
    stopLoading();
    throw new Error(`Failed to initialize Git: ${(error as Error).message}`);
  }
}
