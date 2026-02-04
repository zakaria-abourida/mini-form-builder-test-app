import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useMutation } from '@tanstack/react-query'
import { envConfig } from '@/env/EnvConfig'

/**
 * Resize an image file to fit within maxWidth/maxHeight using canvas, returns a File.
 */
async function resizeImageFile(
    file: File,
    maxWidth: number = 600,
    maxHeight: number = 600
): Promise<File> {
    return new Promise<File>((resolve, reject) => {
        const img = new window.Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            let { width, height } = img
            if (width > maxWidth || height > maxHeight) {
                const scale = Math.min(maxWidth / width, maxHeight / height)
                width = Math.round(width * scale)
                height = Math.round(height * scale)
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject(new Error('Could not get canvas context'))
                return
            }
            ctx.drawImage(img, 0, 0, width, height)
            canvas.toBlob(
                blob => {
                    if (!blob) {
                        reject(new Error('Could not get resized image blob'))
                        return
                    }
                    const resizedFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    })
                    resolve(resizedFile)
                },
                file.type,
                0.9 // JPEG/PNG quality
            )
            URL.revokeObjectURL(url)
        }

        img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Image loading failed'))
        }

        img.src = url
    })
}

export interface MarkdownRendererProps {
    value?: string
    onChange?: (markdown: string) => void
    readOnly?: boolean
    mode?: 'wysiwyg' | 'markdown'
    placeholder?: string
    clearable?: boolean
    id?: string
    isSaving?: boolean
    noValueMarker?: string
    toolbarItems?: unknown
    hideModeSwitch?: boolean
}

export type MarkdownRendererHandle = {
    setValue: (v: string) => void
    clear: () => void
    focus: () => void
}

export const MarkdownRenderer = forwardRef<MarkdownRendererHandle, MarkdownRendererProps>(function MarkdownRenderer(
    { value, onChange, readOnly, noValueMarker, mode = 'wysiwyg', hideModeSwitch = true },
    ref
) {
    const editorRef = useRef<Editor>(null)

    const imageMutation = useMutation({
        mutationFn: async (file: File): Promise<string> => {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch(`${envConfig.config.apiUrl}/mock/feed/upload/image`, {
                method: 'POST',
                body: formData
            })

            if (!res.ok) {
                throw new Error('Image upload failed')
            }

            const data = await res.json()

            if (!data.blob_handle || typeof data.blob_handle !== 'string') {
                throw new Error('No blob_handle in response')
            }

            const uuid = data.blob_handle.replace(/^blob:\/\//, '')

            return `${envConfig.config.apiUrl}/files/${uuid}`
        }
    })

    useEffect(() => {
        if (editorRef.current && value !== undefined) {
            const editorInstance = editorRef.current.getInstance()
            if (editorInstance.getMarkdown() !== value) {
                editorInstance.setMarkdown(value)
            }
        }
    }, [value])

    useImperativeHandle(ref, () => ({
        setValue: (v: string) => {
            editorRef.current?.getInstance().setMarkdown(v)
        },
        clear: () => {
            editorRef.current?.getInstance().setMarkdown('')
        },
        focus: () => {
            editorRef.current?.getInstance().focus()
        }
    }))

    // Image upload handler with resizing
    const handleAddImageBlob = async (blob: File, callback: (url: string, alt?: string) => void) => {
        try {
            const resizedFile = await resizeImageFile(blob, 600, 600)
            const url = await imageMutation.mutateAsync(resizedFile)
            callback(url, blob.name)
        } catch (err) {
            alert('Failed to upload image: ' + (err as Error).message)
        }
    }

    if (readOnly) {
        return (
            <div
                className='prose max-w-full dark:prose-invert'
                dangerouslySetInnerHTML={{
                    __html: editorRef.current
                        ? editorRef.current.getInstance().getHTML()
                        : value || noValueMarker || 'No value'
                }}
            />
        )
    }

    return (
        <div className="my-toast-editor">
            <Editor
                ref={editorRef}
                initialValue={value || ''}
                previewStyle="vertical"
                height="400px"
                hideModeSwitch={hideModeSwitch}
                initialEditType={mode}
                useCommandShortcut={true}
                onChange={() => {
                    if (editorRef.current) {
                        const md = editorRef.current.getInstance().getMarkdown();
                        onChange?.(md);
                    }
                }}
                hooks={{
                    addImageBlobHook: handleAddImageBlob
                }}
                // toolbarItems={...}
            />
        </div>
    )
})
