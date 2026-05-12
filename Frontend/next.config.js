const path = require('path');

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  trailingSlash: true,

  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'components')],
  },
  images: {
    deviceSizes: [576, 1000, 1400, 1600, 1920, 2560],
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|jsx|ts|tsx)$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
              jsx: {
                babelConfig: {
                  plugins: ["react-inline-svg-unique-id"],
                },
              },
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      issuer: /\.(css|scss)$/,
      loader: "url-loader",
      options: {
        limit: 8192,
        name: "[name].[ext]",
      },
    });

    return config;
  },
}

module.exports = withBundleAnalyzer(nextConfig);
