const fs = require('fs');
const path = require('path');

function replaceColors(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceColors(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf-8');
        let newContent = content
          .replace(/#D9B27A/g, '#E5E5E5')
          .replace(/#1C2A3D/g, '#1A1A1A');
        
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf-8');
          console.log('Updated:', fullPath);
        }
      } catch (e) {
        console.error('Error updating', fullPath, e.message);
      }
    }
  }
}

replaceColors(path.join(__dirname, '..', 'src', 'app', 'components'));
replaceColors(path.join(__dirname, '..', 'src', 'styles'));
