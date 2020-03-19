const { createProxyMiddleware }  = require('http-proxy-middleware');
const morgan = require("morgan");

module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://blockchain.info",
      changeOrigin: true,
      pathRewrite: {
        "^/api/latestblock": "/latestblock",
        "^/api/rawblock": "/rawblock",
        "^/api/rawtx": "/rawtx"
      }
    })
  );

  app.use(morgan('combined'));
};