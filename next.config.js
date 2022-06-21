/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'https://flightpad.devita.co/api' // production api
  },
  exportPathMap: function() {
      return {
      }
  },
  experimental: {
    outputStandalone: true,
  },
}

module.exports = nextConfig
