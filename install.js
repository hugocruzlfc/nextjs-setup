#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, 'config');
const destDir = process.cwd();

try {
  // Copiar todos los archivos de config, incluyendo package.json
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

  // Instalar dependencias desde el package.json copiado
  console.log('Instalando dependencias...');
  execSync('npm install', { stdio: 'inherit', cwd: destDir });

  // Configurar Husky
  console.log('Configurando Husky...');
  execSync('npx husky install', { stdio: 'inherit', cwd: destDir });

  console.log('¡Proyecto configurado con éxito!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}