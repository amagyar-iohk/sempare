module.exports = {
    branches: ["main"],
    plugins: [
        ["@semantic-release/github", {
            "successComment": false,
            "failTitle": false
        }],
        "@semantic-release/commit-analyzer",
        "@semantic-release/npm"
    ]
}
