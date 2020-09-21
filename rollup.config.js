import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// const nodeResolve = require('@rollup/plugin-node-resolve')
import { nodeResolve } from '@rollup/plugin-node-resolve'

module.exports = {
    input: 'src/Scripts/main.js',

    plugins: [commonjs(), json(), nodeResolve()],

    output: {
        file: 'Vue.novaextension/Scripts/main.dist.js',
        format: 'cjs',
        exports: 'auto',
    },
}
