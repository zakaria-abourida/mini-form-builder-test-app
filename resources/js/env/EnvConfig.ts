/**
 * Environment configuration for the application
 */
export const envConfig = {
    config: {
        apiUrl: import.meta.env.VITE_API_URL || window.location.origin,
    },
}
