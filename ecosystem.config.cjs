module.exports = {
    apps: [
        {
            name: "book-api",
            script: "src/server.js",
            exec_mode: "fork",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "256M",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
                HOST: "127.1.107.194"
            },
        }
    ]
}