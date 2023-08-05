const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://aircall-job.herokuapp.com',
      changeOrigin: true,
    })
  );
};