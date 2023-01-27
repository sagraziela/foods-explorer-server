module.exports = {
  apps : [{
    name: "foods-explorer",
    script: "./src/server.js",
    exec_mode : "cluster",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
