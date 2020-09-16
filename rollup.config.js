import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

module.exports = {
    input: 'src/Scripts/main.js',

    plugins: [typescript(), nodeResolve()],

    output: {
        file: 'Vue.novaextension/Scripts/main.dist.js',
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
    },
}
