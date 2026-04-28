import fs from 'fs';
import path from 'path';

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      search(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.cjs') || fullPath.endsWith('.mjs')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('window.fetch =') || content.includes('globalThis.fetch =') || content.includes('self.fetch =') || content.includes('global.fetch =')) {
        console.log('Found in:', fullPath);
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (line.includes('fetch =')) {
            console.log(`  Line ${i + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

search('node_modules');
