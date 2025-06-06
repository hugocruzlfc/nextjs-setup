import * as path from 'path';
import { fileURLToPath } from 'url';
import { type CopyFilesOptions, copyFiles } from './utils/copy-files.js';
import { type InitGitOptions, initGit } from './utils/init-git.js';
import {
  type InstallDepsOptions,
  installDependencies,
} from './utils/install-deps.js';

export interface SetupOptions {
  sourceDir?: string;
  destDir?: string;
  preferredPackageManager?: 'pnpm' | 'npm' | 'yarn';
}

export async function setupProject({
  sourceDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'template',
  ),
  destDir = process.cwd(),
  preferredPackageManager = 'pnpm',
}: SetupOptions = {}): Promise<void> {
  try {
    const copyOptions: CopyFilesOptions = { sourceDir, destDir };
    const gitOptions: InitGitOptions = { destDir };
    const depsOptions: InstallDepsOptions = {
      destDir,
      preferredPackageManager,
    };

    await copyFiles(copyOptions);
    await initGit(gitOptions);
    await installDependencies(depsOptions);

    console.log('Setup complete! 🎉');
  } catch (error) {
    console.error('❌ Setup failed!');
    console.error(`Reason: ${(error as Error).message}`);
    console.error(
      'Please check the error above and try again. If the issue persists, contact support or open an issue at https://github.com/hugocruzlfc/nextjs-setup/issues',
    );
    throw error;
  }
}
