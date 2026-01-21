# StrukturAnalyse Layer Viewer - Next.js Component

A modern Next.js implementation of the Layer Visualization dual-view canvas component, rebuilt from the standalone HTML viewer.

## Features

- **Dual Canvas Display**: Side-by-side comparison of two images
- **Interactive Layer Controls**: Toggle visibility of multiple analysis layers
- **HTML5 Canvas Compositing**: Real-time layer rendering with proper z-ordering
- **Responsive Layout**: Full viewport layout with Tailwind CSS
- **TypeScript**: Full type safety with proper interfaces
- **React Hooks**: Modern functional component with hooks

## Layers

The viewer supports 6 layers that can be toggled on/off:

1. **Base Image** (always visible): The original standardized body image
2. **Background Blur**: Blur background while keeping person sharp
3. **Face Blur**: Pixelate face for privacy protection
4. **Outline**: Red contour around the person
5. **Skeleton**: AI-generated skeletal structure overlay
6. **Annotations**: Gravity line, anatomical landmarks, and measurements

## Setup - Complete the Installation

The component has been created with full functionality, but requires the Base64 image data from the source file.

### Run the extraction script:

#### Option 1: Python (Recommended)
```bash
python3 /Users/johannes/Projects/OriginalBody/test-projects/personal-website/scripts/extract.py
```

#### Option 2: Node.js
```bash
node /Users/johannes/Projects/OriginalBody/test-projects/personal-website/scripts/extract-viewer-images.js
```

Either script will:
1. Read the source HTML file
2. Extract all Base64 image data for both image sets
3. Inject the data into the component
4. Save the updated component

### Verify Installation

After running the extraction:

1. Start your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/demos/structure-viewer`

3. You should see:
   - Two side-by-side canvas images
   - Layer controls on the right
   - Interactive checkboxes that toggle layers in real-time

## Component Architecture

### File Structure
```
app/demos/structure-viewer/
├── page.tsx           # Main component
├── README.md          # This file
└── extract-images.md  # Manual extraction instructions
```

### Key Interfaces

```typescript
interface Layer {
  name: string;
  label: string;
  visible: boolean;
  description: string;
}

interface ImageSet {
  base: HTMLImageElement | null;
  bgBlur: HTMLImageElement | null;
  faceBlur: HTMLImageElement | null;
  outline: HTMLImageElement | null;
  skeleton: HTMLImageElement | null;
  annotations: HTMLImageElement | null;
}

interface LayerSettings {
  bgBlur: boolean;
  faceBlur: boolean;
  outline: boolean;
  skeleton: boolean;
  annotations: boolean;
}
```

### Rendering Pipeline

1. **Image Loading** (`useEffect`): Loads all Base64 images into HTMLImageElement objects
2. **Canvas Initialization** (`useEffect`): Sets canvas dimensions to match base images
3. **Layer State Management** (`useState`): Tracks visibility state of each layer
4. **Render Pipeline**:
   - Get current layer settings from checkboxes
   - Clear both canvases
   - Draw layers in order: base → bg_blur → face_blur → outline → skeleton → annotations
   - Only draw layers that are enabled

### Styling

Uses Tailwind CSS utility classes:
- Flexbox layout for responsive dual-canvas display
- Custom sizing for proper viewport filling
- Shadow and border utilities for depth
- Responsive text sizing
- Hover states for interactive elements

## Technical Details

### Canvas Compositing

The component uses the HTML5 Canvas API's default `source-over` composite operation, which overlays each layer on top of the previous ones. Layers with transparency properly blend with layers below.

### Image Format

All images are embedded as Base64-encoded PNG data URLs in the format:
```
data:image/png;base64,iVBORw0KGgo...
```

### Performance Considerations

- Images are loaded once on mount using `Promise.all` for parallel loading
- Canvas rendering only occurs when layer visibility changes
- No unnecessary re-renders due to proper `useEffect` dependencies

## Source Attribution

Rebuilt from: `/Users/johannes/Projects/OriginalBody/StrukturAnalyse/data/layer_visualization/viewer_standalone.html`

Original implementation: Vanilla HTML/CSS/JavaScript
New implementation: Next.js 14+ with TypeScript and Tailwind CSS

## Troubleshooting

### Images not loading
- Ensure the extraction script completed successfully
- Check that Base64 strings start with `data:image/png;base64,`
- Verify no quotes or formatting was corrupted during extraction

### Checkboxes not working
- Check browser console for errors
- Verify React state is updating (use React DevTools)
- Ensure canvas refs are properly connected

### Layout issues
- Verify Tailwind CSS is properly configured in the project
- Check that parent layout doesn't constrain height
- Inspect with browser DevTools to see computed styles

## Future Enhancements

Possible improvements:
- Add zoom/pan controls for canvas
- Export composed image functionality
- Side-by-side comparison slider
- Keyboard shortcuts for layer toggling
- Measurement display overlays
- Animation between layer states
