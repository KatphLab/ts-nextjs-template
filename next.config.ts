import type { NextConfig } from 'next'

const allowedDevelopmentOrigins =
  process.env['ALLOWED_DEV_ORIGINS']
    ?.split(',')
    .map((v) => v.trim())
    .filter(Boolean) ?? []

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: allowedDevelopmentOrigins,
}

export default nextConfig
