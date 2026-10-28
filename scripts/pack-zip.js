import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();
const rootDir = process.cwd();

function addFolderToZip(folderPath, zipFolder) {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    if (item === 'node_modules' || item === 'dist' || item === '.git' || item.endsWith('.zip')) {
      continue;
    }

    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const childZipFolder = zipFolder.folder(item);
      addFolderToZip(fullPath, childZipFolder);
    } else {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(item, content);
    }
  }
}

async function createArchive() {
  console.log('Packaging project into restaurant-network.zip...');
  addFolderToZip(rootDir, zip);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(path.join(rootDir, 'restaurant-network.zip'), content);
  console.log('restaurant-network.zip created successfully! Size:', (content.length / 1024).toFixed(1), 'KB');
}

createArchive().catch(console.error);
