// import './registrars/vueRegistrar.js'
// require('./registrars/vueTemplateRegistrar.js');
// require('./registrars/vueScriptRegistrar.js');

// const ensureInstalled = require('./install.js')
import ensureInstalled from './install'
import {
    showError,
    showActionableError,
    log,
    getConfigWithWorkspaceOverride,
} from './helpers'

let langserver = null

class VueLanguageServer {
    constructor() {
        // Observe the configuration setting for the server's location, and restart the server on change
        nova.config.observe(
            'example.language-server-path',
            function (path) {
                this.start(path)
            },
            this
        )
    }

    deactivate() {
        this.stop()
    }

    start(path) {
        if (this.languageClient) {
            this.languageClient.stop()
            nova.subscriptions.remove(this.languageClient)
        }

        // Use the default server path
        if (!path) {
            path = nova.path.join(
                nova.extension.path,
                'node_modules/vls/bin/vls'
            )
        }

        // Create the client
        var serverOptions = {
            path: path,
        }
        var clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['vue'],
        }
        var client = new LanguageClient(
            'tommasonegri.vue',
            'Vue Language Server',
            serverOptions,
            clientOptions
        )

        try {
            // Start the client
            client.start()

            // Add the client to the subscriptions to be cleaned up
            nova.subscriptions.add(client)
            this.languageClient = client
        } catch (err) {
            // If the .start() method throws, it's likely because the path to the language server is invalid

            if (nova.inDevMode()) {
                console.error(err)
            }
        }
    }

    stop() {
        if (this.languageClient) {
            this.languageClient.stop()
            nova.subscriptions.remove(this.languageClient)
            this.languageClient = null
        }
    }
}

exports.activate = async function () {
    // Do work when the extension is activated
    try {
        await ensureInstalled()

        langserver = new VueLanguageServer()

        console.log('Hello from Vue!')

        //         const { modulePath, prettier, parsers } = await require('./prettier.js')()
        //
        //         const extension = new PrettierExtension(modulePath, prettier, parsers)
        //
        //         if (nova.config.get('prettier.use-compatibility-mode')) {
        //             showActionableError(
        //                 'prettier-compatibility-mode-warning',
        //                 `Compatibility mode will soon disappear`,
        //                 `Please create an issue on Github with information about what version of macOS and Node you're using so we can make sure Prettier keeps working for you.`,
        //                 ['Create issue'],
        //                 (action) => {
        //                     if (!action) return
        //                     nova.openURL(
        //                         'https://github.com/alexanderweiss/nova-prettier/issues/new'
        //                     )
        //                 }
        //             )
        //         }
    } catch (err) {
        console.error('Unable to set up prettier service', err, err.stack)

        if (err.status === 127) {
            return showError(
                'prettier-resolution-error',
                `Can't find npm and Prettier`,
                `Prettier couldn't be found because npm isn't available. Please make sure you have Node installed. If you've only installed Node through NVM, you'll need to change your shell configuration to work with Nova. See https://library.panic.com/nova/environment-variables/`
            )
        }

        return showError(
            'prettier-resolution-error',
            `Unable to start Prettier`,
            `Please check the extension console for additional logs.`
        )
    }

    // langserver.sendNotification('workspace/didChangeConfiguration', {
    //     settings: {
    //         vetur: {
    //             completions: {
    //                 scaffoldSnippetSources: false,
    //             },
    //         },
    //     },
    // })
}

export function deactivate() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate()
        langserver = null
    }
    console.log('Goodbye from Vue!')
}
