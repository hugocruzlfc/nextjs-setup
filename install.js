#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, 'template'); // Contenido de config/
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
  fs.readdirSync(sourceDir).forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.cpSync(sourcePath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
  stopCopyLoading();
  console.log('Configuration files copied! ✅');

  // Instalar dependencias con animación
  const stopDepLoading = showLoading('Installing dependencies ⌛️');
  execSync('pnpm install', { stdio: 'inherit', cwd: destDir });
  stopDepLoading();
  console.log('Dependencies installed! ✅');

  // Configurar Husky con animación
  const stopHuskyLoading = showLoading('Applying Husky configuration ⌛️');
  execSync('npx husky install', { stdio: 'inherit', cwd: destDir });
  stopHuskyLoading();
  console.log('Husky configured! ✅');

  console.log('Setup complete! 🎉');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
