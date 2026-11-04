import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        // TODO: Remove unsafe-inline/eval after the Next.js nonce strategy is in place.
        // TODO: Replace wildcard Firebase/Sandpack hosts with the deployed project domains.
        { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseapp.com https://*.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://*.sentry.io https://*.posthog.com; frame-src 'self' https://www.youtube-nocookie.com https://*.firebaseapp.com https://*.csb.app https://*.codesandbox.io; worker-src 'self' blob:;" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      ],
    },
  ],
};

export default nextConfig;
