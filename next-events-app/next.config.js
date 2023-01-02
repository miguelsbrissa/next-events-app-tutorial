/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images:{
		remotePatterns:[
			{
				protocol: 'https',
				hostname: 'images.unsplash.com'
			},
			{
				protocol: 'https',
				hostname: 'wembleypark.com'
			}
		]
	}
}

// eslint-disable-next-line no-undef
module.exports = nextConfig