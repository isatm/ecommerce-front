import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['zbwfbkhommplpihdwrxa.supabase.co'],
    remotePatterns: [
      { protocol: "https", hostname: "solidsound.wpenginepowered.com"},
      { protocol: "https", hostname: "link-a-una-imagen.com" },
      { protocol: "https", hostname: "cdn.supabase.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
