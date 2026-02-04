# MarkdownRenderer Component

A React component that provides a rich markdown editor with image upload and automatic image resizing functionality.

## Features

- 📝 WYSIWYG and Markdown editing modes
- 🖼️ Automatic image resizing before upload (600x600 max dimensions)
- 📤 Image upload support
- 🎨 Read-only rendering mode
- ⚡ Built on Toast UI Editor

## Installation

The required dependencies are already installed:
- `@toast-ui/editor`
- `@toast-ui/react-editor`
- `@tanstack/react-query`

## Usage

### Basic Example

```tsx
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

function MyComponent() {
  const [content, setContent] = useState('')

  return (
    <MarkdownRenderer
      value={content}
      onChange={setContent}
      mode="wysiwyg"
    />
  )
}
```

### With Ref (Imperative Handle)

```tsx
import { useRef } from 'react'
import { MarkdownRenderer, MarkdownRendererHandle } from '@/components/MarkdownRenderer'

function MyComponent() {
  const editorRef = useRef<MarkdownRendererHandle>(null)

  const handleClear = () => {
    editorRef.current?.clear()
  }

  const handleSetValue = () => {
    editorRef.current?.setValue('# Hello World')
  }

  return (
    <>
      <MarkdownRenderer ref={editorRef} />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSetValue}>Set Value</button>
    </>
  )
}
```

### Read-only Mode

```tsx
<MarkdownRenderer
  value={content}
  readOnly={true}
  noValueMarker="No content available"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | The markdown content |
| `onChange` | `(markdown: string) => void` | `undefined` | Callback when content changes |
| `readOnly` | `boolean` | `false` | Enable read-only mode |
| `mode` | `'wysiwyg' \| 'markdown'` | `'wysiwyg'` | Initial editing mode |
| `hideModeSwitch` | `boolean` | `true` | Hide the mode switch button |
| `noValueMarker` | `string` | `'No value'` | Text to show when empty in read-only mode |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `toolbarItems` | `unknown` | `undefined` | Custom toolbar items |

## Image Upload

Images are automatically:
1. Resized to fit within 600x600 pixels while maintaining aspect ratio
2. Uploaded to the API endpoint configured in EnvConfig
3. Inserted into the editor with the returned URL

The component uses a quality setting of 0.9 (90%) for JPEG/PNG compression.

## Environment Configuration

The component uses the API URL from `EnvConfig`:

```typescript
// resources/js/env/EnvConfig.ts
export const envConfig = {
    config: {
        apiUrl: import.meta.env.VITE_API_URL || window.location.origin,
        imageUploadEndpoint: import.meta.env.VITE_IMAGE_UPLOAD_ENDPOINT || '/mock/feed/upload/image',
    },
}
```

Set these environment variables in your `.env` file:

```
VITE_API_URL=https://your-api-url.com
VITE_IMAGE_UPLOAD_ENDPOINT=/api/upload/image
```

## Image Upload Endpoint

The component expects an image upload endpoint configured via environment variables (defaults to `/mock/feed/upload/image`):

```
POST {VITE_IMAGE_UPLOAD_ENDPOINT}
```

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (File)

**Response:**
```json
{
  "blob_handle": "blob://uuid-here"
}
```

The component will extract the UUID and construct the image URL as:
```
{apiUrl}/files/{uuid}
```

## Imperative Handle Methods

When using a ref, you can access these methods:

- `setValue(value: string)` - Set the editor content
- `clear()` - Clear the editor content
- `focus()` - Focus the editor

## Styling

The component uses these CSS classes:
- `.my-toast-editor` - Wrapper for the editor
- `.prose` - For read-only content rendering (with Tailwind Typography)

Import the Toast UI Editor CSS in your component:
```typescript
import '@toast-ui/editor/dist/toastui-editor.css'
```

## Dependencies

This component requires the QueryClientProvider to be set up in your app. It's already configured in `resources/js/app.tsx`.
