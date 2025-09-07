// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: "50mb" }, 
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.pixabay.com",
      "upload.wikimedia.org",
      "example.com",
      "res.cloudinary.com",
      "plus.unsplash.com",
      'img.clerk.com',
      "lh3.googleusercontent.com"

    ],
    
    
  },
}

module.exports = nextConfig
