module.exports = {
  turbopack: {
    root: __dirname,
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/feed",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
