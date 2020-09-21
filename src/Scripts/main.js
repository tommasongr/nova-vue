import './registrars/vueRegistrar.js'
// require('./registrars/vueTemplateRegistrar.js');
// require('./registrars/vueScriptRegistrar.js');

export function activate() {
    // Do work when the extension is activated
    console.log('Hello from Vue!')
}

export function deactivate() {
    // Clean up state before the extension is deactivated
    console.log('Goodbye!')
}
