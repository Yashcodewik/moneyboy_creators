module.exports = {
  turbopack: {
    root: __dirname,
  },

  // ✅ ADD THIS
  allowedDevOrigins: ['192.168.1.36'],

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