const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const uploadsPath = process.env.UPLOAD_PATH || "/uploads";
const apiPath = process.env.API_PATH || "/api";
const proxyHost = process.env.PROXY_HOST || "http://localhost:1337";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Set up the proxy.
  if (dev) {
    const proxy = createProxyMiddleware({
      target: proxyHost,
      changeOrigin: true,
      logLevel: "debug",
      ws: false,
    });

    server.use(uploadsPath, proxy);
    server.use(apiPath, proxy);
    console.log(`> Proxying paths ${uploadsPath}, ${apiPath}`);
  }

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Running env ${process.env.NODE_ENV}`);
  });
});