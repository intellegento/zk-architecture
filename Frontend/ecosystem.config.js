module.exports = {
  apps: [
    {
      name: "value-frontend",
      script: "npm",
      args: "run start:staging",
      env: {
        NODE_ENV: "production",
        PORT: "3020",
      },
    },
  ],
};
