import { copyFiles, type CopyFilesOptions } from '@utils/copy-files.js';
import { initGit, type InitGitOptions } from '@utils/init-git.js';
import {
  installDependencies,
  type InstallDepsOptions,
} from '@utils/install-deps.js';
import * as path from 'path';

export interface SetupOptions {
  sourceDir?: string;
  destDir?: string;
  preferredPackageManager?: 'pnpm' | 'npm' | 'yarn';
}

export async function setupProject({
  sourceDir = path.join(__dirname, '..', 'template'),
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
