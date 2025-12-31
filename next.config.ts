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
};
