module.exports = {
  apps: [
    {
      name: "counteroffer-portfolio",
      script: "./app.js",
      env: {
        PORT: 80,
      },
      interpreter: "/usr/bin/node",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
