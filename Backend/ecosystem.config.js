module.exports = {
    apps: [
      {
        name: 'value backend',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
          PORT: "1337",
        },
      },
    ],
};
