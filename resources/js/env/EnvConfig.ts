/**
 * Environment configuration for the application
 */
export const envConfig = {
    config: {
        apiUrl: import.meta.env.VITE_API_URL || window.location.origin,
        imageUploadEndpoint: import.meta.env.VITE_IMAGE_UPLOAD_ENDPOINT || '/mock/feed/upload/image',
    },
}
