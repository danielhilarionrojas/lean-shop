/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/purchase-products', 
        destination: 'https://pm3uf3zsxf.us-east-1.awsapprunner.com/purchase-products',
        
      },
    ];
  },
};

export default nextConfig;
