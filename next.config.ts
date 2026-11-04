import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js requires inline scripts and styles in dev/build
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              // TODO: Tighten script-src — remove 'unsafe-eval' and 'unsafe-inline' for production.
              //       Use nonces via next.config headers or middleware for inline scripts.
              "style-src 'self' 'unsafe-inline'",
              // TODO: Tighten style-src — remove 'unsafe-inline' once CSS-in-JS is
              //       configured with nonces or all styles are external.
              "img-src 'self' data: blob: https:",
              // Fonts: self-hosted via next/font, no external requests needed
              "font-src 'self' data:",
              // TODO: Restrict connect-src to specific API domains once known.
              "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.google.com",
              // YouTube embeds (youtube-nocookie.com for privacy) and Sandpack bundler iframes
              "frame-src 'self' https://www.youtube-nocookie.com https://*.codesandbox.io https://*.sandpack.codesandbox.io",
              // TODO: Review frame-src — tighten Sandpack domains once exact bundler URLs are known.
              // Firebase Auth popup/redirect domains
              // TODO: Replace *.firebaseapp.com with your specific Firebase project domain.
              "child-src 'self' https://*.firebaseapp.com",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              // TODO: Add 'upgrade-insecure-requests' for production.
              // "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
