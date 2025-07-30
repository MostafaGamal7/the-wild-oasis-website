/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      new URL(
        "https://gadcehaddekxmslafamf.supabase.co/storage/v1/object/public/cabin-images/**"
      ),
    ],
  },
};

export default nextConfig;
