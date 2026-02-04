import { useRef, useState } from 'react'
import { Head } from '@inertiajs/react'
import { MarkdownRenderer, type MarkdownRendererHandle } from '@/components/MarkdownRenderer'
import AuthenticatedLayout from '@/layouts/auth-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function MarkdownExample() {
    const [content, setContent] = useState('# Welcome to MarkdownRenderer\n\nStart typing your content here...')
    const [readOnly, setReadOnly] = useState(false)
    const editorRef = useRef<MarkdownRendererHandle>(null)

    const handleClear = () => {
        editorRef.current?.clear()
        setContent('')
    }

    const handleSetSample = () => {
        const sampleContent = `# Sample Document

## Introduction

This is a **sample document** to demonstrate the MarkdownRenderer component.

### Features

- Rich text editing
- Image upload with automatic resizing
- WYSIWYG and Markdown modes
- Read-only rendering

### Code Example

\`\`\`javascript
const example = () => {
  console.log('Hello, Markdown!');
}
\`\`\`

> This is a blockquote to show formatting capabilities.
`
        editorRef.current?.setValue(sampleContent)
        setContent(sampleContent)
    }

    const handleToggleMode = () => {
        setReadOnly(!readOnly)
    }

    return (
        <AuthenticatedLayout
            title="Markdown Editor Example"
            description="Example usage of the MarkdownRenderer component"
        >
            <Head title="Markdown Editor Example" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>MarkdownRenderer Component Example</CardTitle>
                            <CardDescription>
                                A rich text editor with image upload and automatic resizing
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Button onClick={handleClear} variant="outline">
                                    Clear
                                </Button>
                                <Button onClick={handleSetSample} variant="outline">
                                    Load Sample
                                </Button>
                                <Button onClick={handleToggleMode} variant="outline">
                                    Toggle {readOnly ? 'Edit' : 'Read-only'} Mode
                                </Button>
                            </div>

                            <div className="rounded-lg border p-4">
                                <MarkdownRenderer
                                    ref={editorRef}
                                    value={content}
                                    onChange={setContent}
                                    readOnly={readOnly}
                                    mode="wysiwyg"
                                    noValueMarker="No content yet. Start typing!"
                                />
                            </div>

                            <div className="mt-4 rounded-lg bg-muted p-4">
                                <h3 className="mb-2 text-sm font-semibold">Current Content Length:</h3>
                                <p className="text-sm text-muted-foreground">
                                    {content.length} characters
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Usage Instructions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc space-y-2 pl-5 text-sm">
                                <li>Use the editor toolbar to format text</li>
                                <li>Drag and drop images or use the image button to upload</li>
                                <li>Images are automatically resized to 600x600 pixels max</li>
                                <li>Switch between Edit and Read-only modes to see rendering</li>
                                <li>Click "Load Sample" to see formatted content examples</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
