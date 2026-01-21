#!/usr/bin/env python3
"""
Extract Base64 image data from viewer_standalone.html
"""

import re

source_file = '/Users/johannes/Projects/OriginalBody/StrukturAnalyse/data/layer_visualization/viewer_standalone.html'
target_file = '/Users/johannes/Projects/OriginalBody/test-projects/personal-website/app/demos/structure-viewer/page.tsx'

print('Reading source file...')
with open(source_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract img1Data block
img1_pattern = r'const img1Data = \{([^}]+)\};'
img1_match = re.search(img1_pattern, content, re.DOTALL)

# Extract img2Data block
img2_pattern = r'const img2Data = \{([^}]+)\};'
img2_match = re.search(img2_pattern, content, re.DOTALL)

if not img1_match or not img2_match:
    print('ERROR: Could not find image data blocks')
    exit(1)

# Extract individual properties
def extract_props(block_text):
    props = {}
    for prop in ['base', 'bgBlur', 'faceBlur', 'outline', 'skeleton', 'annotations']:
        pattern = rf'{prop}:\s*"([^"]+)"'
        match = re.search(pattern, block_text)
        if match:
            props[prop] = match.group(1)
        else:
            print(f'WARNING: Could not find {prop}')
    return props

img1_data = extract_props(img1_match.group(0))
img2_data = extract_props(img2_match.group(0))

print(f'Extracted {len(img1_data)} properties for img1Data')
print(f'Extracted {len(img2_data)} properties for img2Data')

# Read target file
print('\nReading target file...')
with open(target_file, 'r', encoding='utf-8') as f:
    target_content = f.read()

# Build replacement strings
img1_replacement = f'''const img1Data = {{
    base: "{img1_data['base']}",
    bgBlur: "{img1_data['bgBlur']}",
    faceBlur: "{img1_data['faceBlur']}",
    outline: "{img1_data['outline']}",
    skeleton: "{img1_data['skeleton']}",
    annotations: "{img1_data['annotations']}",
  }};'''

img2_replacement = f'''const img2Data = {{
    base: "{img2_data['base']}",
    bgBlur: "{img2_data['bgBlur']}",
    faceBlur: "{img2_data['faceBlur']}",
    outline: "{img2_data['outline']}",
    skeleton: "{img2_data['skeleton']}",
    annotations: "{img2_data['annotations']}",
  }};'''

# Replace in target
target_content = re.sub(
    r'const img1Data = \{[^}]+\};',
    img1_replacement,
    target_content,
    flags=re.DOTALL
)

target_content = re.sub(
    r'const img2Data = \{[^}]+\};',
    img2_replacement,
    target_content,
    flags=re.DOTALL
)

# Write back
print('Writing updated target file...')
with open(target_file, 'w', encoding='utf-8') as f:
    f.write(target_content)

print('\n✓ Successfully updated component with image data!')
print('The component is now ready to use.')
