import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  // Bundles a minimal server with only the needed dependencies, used by the
  // Docker image
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
