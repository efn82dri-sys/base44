/** @type {import('next').NextConfig} */
const hostSuffix = process.env.BASE44_PUBLIC_HOST_SUFFIX;
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Next dev blocks dev assets/HMR requests whose Origin is not allowlisted.
  // The preview reaches the sandbox through the public proxy, so both the
  // proxied origin and the sandbox host wildcard have to be accepted.
  allowedDevOrigins: [
    ...(hostSuffix ? [`3000-${hostSuffix}`] : []),
    ...(sandboxDomain ? [`.${sandboxDomain}`] : []),
  ],
};

export default nextConfig;
