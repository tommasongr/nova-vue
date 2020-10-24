module.exports = {
    root: true,
    env: {
        commonjs: true,
        'nova/nova': true,
    },
    extends: ['plugin:prettier/recommended'],
    plugins: ['nova', 'prettier'],
    // add your custom rules here
    rules: {
        'prettier/prettier': 'error',
    },
}
