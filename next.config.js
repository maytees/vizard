require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APPWRITE_PROF_PIC_BUCKET: process.env.APPWRITE_PROF_PIC_BUCKET,
    APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
    APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
    _APP_OPTIONS_ABUSE: process.env._APP_OPTIONS_ABUSE,
    DEFAULT_PROFILE_PIC_URL: process.env.DEFAULT_PROFILE_PIC_URL
  }
}

module.exports = nextConfig
