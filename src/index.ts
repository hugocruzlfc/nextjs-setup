#!/usr/bin/env node

import { setupProject } from './setup.js';

async function main(): Promise<void> {
  try {
    await setupProject();
  } catch (error) {
    process.exit(1);
  }
}

void main();
