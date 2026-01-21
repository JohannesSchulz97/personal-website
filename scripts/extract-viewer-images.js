#!/usr/bin/env node

/**
 * Helper script to extract Base64 image data from viewer_standalone.html
 * and inject it into the Next.js component
 */

const fs = require('fs');
const path = require('path');

const sourceFile = '/Users/johannes/Projects/OriginalBody/StrukturAnalyse/data/layer_visualization/viewer_standalone.html';
const targetFile = '/Users/johannes/Projects/OriginalBody/test-projects/personal-website/app/demos/structure-viewer/page.tsx';

console.log('Reading source file...');
const sourceContent = fs.readFileSync(sourceFile, 'utf8');

// Extract img1Data and img2Data objects using regex
const img1DataMatch = sourceContent.match(/const img1Data = \{([^}]+)\}/s);
const img2DataMatch = sourceContent.match(/const img2Data = \{([^}]+)\}/s);

if (!img1DataMatch || !img2DataMatch) {
  console.error('Could not find image data in source file');
  process.exit(1);
}

// Extract individual image properties
function extractImageData(dataMatch) {
  const data = {};
  const properties = ['base', 'bgBlur', 'faceBlur', 'outline', 'skeleton', 'annotations'];

  properties.forEach(prop => {
    const regex = new RegExp(`${prop}:\\s*"([^"]+)"`);
    const match = dataMatch.match(regex);
    if (match) {
      data[prop] = match[1];
    }
  });

  return data;
}

const img1Data = extractImageData(img1DataMatch[0]);
const img2Data = extractImageData(img2DataMatch[0]);

console.log('Extracted image data:');
console.log('- img1Data keys:', Object.keys(img1Data));
console.log('- img2Data keys:', Object.keys(img2Data));

// Read target file
console.log('\nReading target file...');
let targetContent = fs.readFileSync(targetFile, 'utf8');

// Replace img1Data
const img1DataReplacement = `const img1Data = {
    base: "${img1Data.base}",
    bgBlur: "${img1Data.bgBlur}",
    faceBlur: "${img1Data.faceBlur}",
    outline: "${img1Data.outline}",
    skeleton: "${img1Data.skeleton}",
    annotations: "${img1Data.annotations}",
  };`;

targetContent = targetContent.replace(
  /const img1Data = \{[^}]+\};/s,
  img1DataReplacement
);

// Replace img2Data
const img2DataReplacement = `const img2Data = {
    base: "${img2Data.base}",
    bgBlur: "${img2Data.bgBlur}",
    faceBlur: "${img2Data.faceBlur}",
    outline: "${img2Data.outline}",
    skeleton: "${img2Data.skeleton}",
    annotations: "${img2Data.annotations}",
  };`;

targetContent = targetContent.replace(
  /const img2Data = \{[^}]+\};/s,
  img2DataReplacement
);

// Write back to target file
console.log('Writing updated target file...');
fs.writeFileSync(targetFile, targetContent, 'utf8');

console.log('\n✓ Successfully extracted and injected image data!');
console.log('The component is now ready to use.');
