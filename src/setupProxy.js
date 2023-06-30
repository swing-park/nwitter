const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://us-central1-nwitter-e214a.cloudfunctions.net",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
};
