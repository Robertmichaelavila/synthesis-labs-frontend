import path from 'path'

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error('API URL not defined')
}

export default {
  webpack: (config:any) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',            // qualquer chamada para /api/...
        destination: `${API_URL}/:path*`, // encaminha para o backend
      },
    ];
  },
}