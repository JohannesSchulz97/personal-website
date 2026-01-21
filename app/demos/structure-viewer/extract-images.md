# Extract Image Data Instructions

The component has been created but needs the actual Base64 image data from the source file.

## Quick Extract Method

### Option 1: Use the Node.js script

Run the extraction script:

```bash
node /Users/johannes/Projects/OriginalBody/test-projects/personal-website/scripts/extract-viewer-images.js
```

This will automatically extract the image data from the source HTML file and inject it into the component.

### Option 2: Manual extraction

1. Open the source file:
   `/Users/johannes/Projects/OriginalBody/StrukturAnalyse/data/layer_visualization/viewer_standalone.html`

2. Find the `const img1Data = {` section (around line 161)

3. Copy the entire object including all properties:
   - base
   - bgBlur
   - faceBlur
   - outline
   - skeleton
   - annotations

4. Replace the placeholder `img1Data` object in:
   `/Users/johannes/Projects/OriginalBody/test-projects/personal-website/app/demos/structure-viewer/page.tsx`

5. Repeat for `const img2Data = {` (around line 170)

### Option 3: Using sed command

```bash
# Extract img1Data lines 161-168
sed -n '161,168p' /Users/johannes/Projects/OriginalBody/StrukturAnalyse/data/layer_visualization/viewer_standalone.html

# Extract img2Data lines 170-177
sed -n '170,177p' /Users/johannes/Projects/OriginalBody/StrukturAnalyse/data/layer_visualization/viewer_standalone.html
```

Then manually copy these into the component file.

## Verification

After extraction, you should see very long Base64 strings starting with `data:image/png;base64,iVBORw0KGgo...`

The component should then load and display the two images with interactive layer controls.
