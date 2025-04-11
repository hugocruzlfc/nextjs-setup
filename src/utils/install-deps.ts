import { execSync } from 'child_process';
import { showLoading } from './show-loading.js';

export interface InstallDepsOptions {
  destDir: string;
  preferredPackageManager?: 'pnpm' | 'npm' | 'yarn';
}

export async function installDependencies({
  destDir,
  preferredPackageManager = 'pnpm',
}: InstallDepsOptions): Promise<void> {
  console.log('Installing dependencies... ⌛️');
  const stopLoading = showLoading('Installing dependencies ⌛️');

  try {
    if (preferredPackageManager === 'pnpm') {
      try {
        execSync('pnpm install', { stdio: 'inherit', cwd: destDir });
      } catch (pnpmError) {
        console.log('pnpm not found, falling back to npm...');
        execSync('npm install', { stdio: 'inherit', cwd: destDir });
      }
    } else {
      execSync(`${preferredPackageManager} install`, {
        stdio: 'inherit',
        cwd: destDir,
      });
    }
    stopLoading();
    console.log('Dependencies installed! ✅');
  } catch (error) {
    stopLoading();
    throw new Error(
      `Failed to install dependencies: ${(error as Error).message}`,
    );
  }
}
