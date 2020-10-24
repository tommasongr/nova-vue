import ensureInstalled from './install'
import { showNotification, wrapCommand } from './helpers'
import isVeturModeEnabled from './isVeturModeEnabled'

let langserver = null

nova.commands.register(
    'tommasonegri.vue.openWorkspaceConfig',
    wrapCommand(function openWorkspaceConfig(workspace) {
        workspace.openConfig()
    })
)
nova.commands.register('tommasonegri.vue.commands.reload', reload)

class VueLanguageServer {
    constructor() {
        // Observe the configuration setting for the server's location, and restart the server on change
        nova.config.observe(
            'tommasonegri.vue.config.vls-path',
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

async function reload() {
    deactivate()
    console.log('Reloading...')
    await asyncActivate()
}

async function asyncActivate() {
    try {
        if (isVeturModeEnabled()) {
            await ensureInstalled()

            langserver = new VueLanguageServer()
        }

        console.log('Hello from Vue!')
    } catch (err) {
        console.error('Unable to set up Vue service', err, err.stack)

        if (err.status === 127) {
            return showNotification(
                'vue-resolution-error',
                `Can't find npm and Vue`,
                `Vue couldn't be found because npm isn't available. Please make sure you have Node installed. If you've only installed Node through NVM, you'll need to change your shell configuration to work with Nova. See https://library.panic.com/nova/environment-variables/`
            )
        }

        return showNotification(
            'vue-resolution-error',
            `Unable to start Vue`,
            `Please check the extension console for additional logs.`
        )
    }
}

exports.activate = function () {
    // Do work when the extension is activated
    return asyncActivate()
}

export function deactivate() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate()
        langserver = null
    }

    console.log('Goodbye from Vue!')
}
