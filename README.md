# WeWeb Image Upload Component

A fully customizable image upload component for WeWeb with preview, validation, and drag & drop support.

## Features

- **Upload Methods**: Click to browse or drag & drop
- **Image Preview**: Display uploaded image with file information
- **File Validation**: Size limits and format restrictions
- **Customizable Design**: Extensive styling options for all elements
- **Events**: Track upload, removal, and errors
- **Actions**: Programmatic control of the component
- **Responsive**: Preview size adapts to different breakpoints

## Installation

1. Clone this repository or download the files
2. Add the component to your WeWeb project
3. Use `weweb serve` to test locally

## Configuration

### Upload Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Max File Size (MB) | Number | 5 | Maximum allowed file size in megabytes |
| Accepted Formats | Select | All Images | File format restrictions |
| Custom Formats | Text | - | Custom MIME types (comma-separated) |

### Preview Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Preview Width | Length | 300px | Width of image preview (responsive) |
| Preview Height | Length | auto | Height of image preview (responsive) |
| Preview Object Fit | Select | contain | How image fits in container |

### Text Labels

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Upload Area Text | Text | Click or drag image to upload | Main upload area text |
| Upload Area Subtext | Text | PNG, JPG up to 5MB | Secondary text |
| Cancel Button Label | Text | Remove | Remove button text |
| Change Image Label | Text | Change Image | Change button text |

## Events

### imageSelected
Triggered when an image is successfully selected and loaded.

**Event Data:**
```javascript
{
  file: File,           // The original file object
  fileName: string,     // Name of the file
  fileSize: number,     // Size in bytes
  fileType: string,     // MIME type
  dataUrl: string       // Base64 data URL
}
```

### imageRemoved
Triggered when the user removes the uploaded image.

**Event Data:**
```javascript
{}
```

### uploadError
Triggered when validation fails or an error occurs.

**Event Data:**
```javascript
{
  errorType: string,      // 'invalid_type', 'file_too_large', or 'read_error'
  errorMessage: string,   // Human-readable error message
  fileName: string,       // Name of the file
  fileSize: number        // Size in bytes
}
```

## Actions

### clearImage()
Programmatically clear the current image.

**Returns:** `true`

### triggerFileInput()
Programmatically open the file selection dialog.

**Returns:** `void`

## Component Variables

Access these variables in your WeWeb workflows:

| Variable | Type | Description |
|----------|------|-------------|
| selectedImage | string | Base64 data URL of the image |
| fileName | string | Name of the uploaded file |
| fileSize | number | Size of the file in bytes |
| fileType | string | MIME type of the file |
| fileData | object | Complete file metadata |

## Styling Options

The component offers extensive customization for:

- **Upload Area**: Border style, colors, padding, hover effects
- **Icon**: Size and color
- **Text**: Font sizes and colors for main and subtext
- **Preview**: Border radius, border color, object fit
- **Buttons**: Background colors, text colors, padding, border radius
- **Error Messages**: Colors and font sizes

## Usage Example

### Basic Setup
1. Add the component to your page
2. Set max file size and accepted formats
3. Configure preview dimensions
4. Style to match your design

### With Workflow
1. Listen to `imageSelected` event
2. Access `event.dataUrl` to get the image
3. Send to your backend or store in a variable
4. Use `clearImage` action to reset after upload

## Accepted File Formats

- **All Images**: `image/*`
- **JPG, PNG**: `image/jpeg,image/png`
- **JPG, PNG, WebP**: `image/jpeg,image/png,image/webp`
- **PNG only**: `image/png`
- **JPG only**: `image/jpeg`
- **Custom**: Define your own MIME types

## Future Enhancements

- [ ] WebP conversion support
- [ ] Image compression before upload
- [ ] Multiple image upload
- [ ] Image cropping/editing
- [ ] Progress bar for large files

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
