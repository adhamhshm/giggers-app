/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com', 'task.com']
    },
    //https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    //Dependencies used inside Server Components and Route Handlers will automatically be bundled by Next.js.
    //If a dependency is using Node.js specific features, you can choose to opt-out specific dependencies from 
    //the Server Components bundling and use native Node.js require.
    experimental: {
        serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
    }
}
  
  module.exports = nextConfig
