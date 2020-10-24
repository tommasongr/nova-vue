import commonjs from '@rollup/plugin-commonjs'
// const nodeResolve = require('@rollup/plugin-node-resolve')
import { nodeResolve } from '@rollup/plugin-node-resolve'

module.exports = {
    input: 'src/Scripts/main.js',

    plugins: [commonjs(), nodeResolve()],

    output: {
        file: 'Vue.novaextension/Scripts/main.dist.js',
        format: 'cjs',
        exports: 'auto',
    },
}
