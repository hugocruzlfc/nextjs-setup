#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, 'template'); // Contenido de template/
const destDir = process.cwd(); // Raíz del proyecto destino

// Función para mostrar una animación de "cargando" con puntitos
function showLoading(message) {
  process.stdout.write(`${message} `);
  let dots = 0;
  const interval = setInterval(() => {
    process.stdout.write('.');
    dots++;
    if (dots > 3) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(`${message} `);
      dots = 0;
    }
  }, 300);
  return () => {
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  };
}

try {
  // Copiar archivos con animación
  console.log('Copying configuration files... ⌛️');
  const stopCopyLoading = showLoading('Copying configuration files ⌛️');
  try {
    fs.readdirSync(sourceDir).forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      if (fs.lstatSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  } catch (copyError) {
    stopCopyLoading();
    throw new Error(`Failed to copy configuration files: ${copyError.message}`);
  }
  stopCopyLoading();
  console.log('Configuration files copied! ✅');

  // Verificar si ya existe un repositorio Git
  const gitDir = path.join(destDir, '.git');
  if (!fs.existsSync(gitDir)) {
    // Inicializar Git si no existe
    console.log('Initializing Git repository... ⌛️');
    const stopGitLoading = showLoading('Initializing Git repository ⌛️');
    try {
      execSync('git init', { stdio: 'inherit', cwd: destDir });
    } catch (gitError) {
      stopGitLoading();
      throw new Error(`Failed to initialize Git: ${gitError.message}`);
    }
    stopGitLoading();
    console.log('Git repository initialized! ✅');
  } else {
    console.log('Git repository already exists, skipping initialization... ✅');
  }

  // Instalar dependencias con animación y fallback
  console.log('Installing dependencies... ⌛️');
  const stopDepLoading = showLoading('Installing dependencies ⌛️');
  try {
    try {
      execSync('pnpm install', { stdio: 'inherit', cwd: destDir });
    } catch (pnpmError) {
      console.log('pnpm not found, falling back to npm...');
      execSync('npm install', { stdio: 'inherit', cwd: destDir });
    }
  } catch (installError) {
    stopDepLoading();
    throw new Error(`Failed to install dependencies: ${installError.message}`);
  }
  stopDepLoading();
  console.log('Dependencies installed! ✅');

  console.log('Setup complete! 🎉');
} catch (error) {
  console.error('❌ Setup failed!');
  console.error(`Reason: ${error.message}`);
  console.error(
    'Please check the error above and try again. If the issue persists, contact support or open an issue at https://github.com/hugocruzlfc/nextjs-setup/issues',
  );
  process.exit(1);
}
