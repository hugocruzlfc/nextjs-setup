#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, 'config');
const destDir = process.cwd();

try {
  // Copiar archivos de config
  fs.readdirSync(sourceDir).forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.cpSync(sourcePath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
    console.log(`Copiado: ${file}`);
  });

  // Instalar dependencias y preparar Husky
  console.log('Instalando dependencias y configurando Husky...');
  execSync('npm install', { stdio: 'inherit' });
  execSync('npx husky install', { stdio: 'inherit' });

  console.log('¡Configuración aplicada con éxito!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}