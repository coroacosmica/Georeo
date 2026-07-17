const fs = require('fs');

let rawData = fs.readFileSync('./src/labelsList.json', 'utf8');
if (rawData.charCodeAt(0) === 0xFEFF) {
  rawData = rawData.slice(1);
}
const data = JSON.parse(rawData);

// Filter out mp4 and _1 duplicates
const filtered = data.filter(name => {
  return !name.endsWith('.mp4') && !name.includes('_1.jpg') && !name.includes('_1.png');
});

const labels = filtered.map((filename, index) => {
  // Try to create a readable name
  let readableName = filename.split('.')[0]
    .replace(/[-_]/g, ' ')
    .replace(/ChatGPT Image.*/g, 'Custom AI Design')
    .replace(/background_removal.*/g, 'Background Removed Element')
    .replace(/[0-9a-f]{32}/g, 'Abstract Pattern');
    
  return {
    id: `label-${index}`,
    name: readableName.trim().substring(0, 25), // max 25 chars
    url: `/Labels/${filename}`,
    price: 0
  };
});

const tsContent = `export const ALL_LABELS = ${JSON.stringify(labels, null, 2)};\n`;

fs.writeFileSync('./src/data/labels.ts', tsContent);
console.log('Successfully generated labels.ts with ' + labels.length + ' labels.');
