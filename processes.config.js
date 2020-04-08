module.exports = {
    apps: [
        {
            script: "./node_modules/.bin/ts-node",
            args: "./src/app.ts",
            instances: "max",
            exec_mode: "cluster",
        },
    ],
};
