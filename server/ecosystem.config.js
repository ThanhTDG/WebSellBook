module.exports = {
  apps: [
    {
      name: "API ToiMuaSach",
      script: "./src/index.js",
      watch: ".",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
    },
  ],

  deploy: {
    production: {
      user: "Duong Hieu",
      host: "10.0.101.45",
      ref: "origin/main",
      repo: "https://github.com/ThanhTDG/WebSellBook.git",
      path: "/server",
      "post-deploy":
        "cd /server && npm install && pm2 reload ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
