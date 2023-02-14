module.exports = {
  apps : [{
    name   : "counteroffer",
    script : "./app.js",
    env: {
      "PORT": 80
    },
    interpreter: "/usr/bin/node",
    exec_mode: "cluster",
    instances: "max"
  }]
}
