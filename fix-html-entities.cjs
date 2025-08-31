#!/usr/bin/env node

/**
 * Fix HTML Entities Script
 * This script fixes the HTML entities that were incorrectly added by the linting fix script
 */

const fs = require('fs');
const path = require('path');

function fixHtmlEntities(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix HTML entities back to proper characters
    if (content.includes('&apos;')) {
      content = content.replace(/&apos;/g, "'");
      modified = true;
    }
    
    if (content.includes('&quot;')) {
      content = content.replace(/&quot;/g, '"');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      fixHtmlEntities(filePath);
    }
  });
}

console.log('🔧 Fixing HTML Entities...');
console.log('================================================');

// Process src directory
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
}

console.log('✅ HTML entities fix completed!');
