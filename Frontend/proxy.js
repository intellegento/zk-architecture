const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const port = parseInt(process.env.PORT, 10) || 3000;
const uploadsPath = process.env.UPLOAD_PATH || "/uploads";
const apiPath = process.env.API_PATH || "/api";
const proxyHost = process.env.PROXY_HOST || "http://localhost:1337";

const app = express();

const proxy = createProxyMiddleware({
  target: proxyHost,
  changeOrigin: true,
  logLevel: "debug",
});

app.use(uploadsPath, proxy);
app.use(apiPath, proxy);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
  console.log(`> Running env ${env}`);
});

process.once('SIGTERM', () => process.exit(0))