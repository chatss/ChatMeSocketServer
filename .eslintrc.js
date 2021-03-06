module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: ["eslint:recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        indent: ["error", 4],
        "no-unused-vars": 1,
    },
};
