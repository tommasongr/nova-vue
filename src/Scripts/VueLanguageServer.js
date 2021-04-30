import { dependencyManagement } from 'nova-extension-utils'

export class VueLanguageServer {
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
                dependencyManagement.getDependencyDirectory(),
                'node_modules',
                '.bin',
                'vls'
            )
        }

        // Create the client
        var serverOptions = {
            path: path,
        }
        var clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['vue'],
            initializationOptions: {
                config: {
                    vetur: {
                        format: {
                            enable: false,
                        },
                        // Disabled for preventing xxx errors to show up
                        // TODO: Add a setting for opening it
                        validation: {
                            interpolation: false,
                        },
                        experimental: {
                            templateInterpolationService: true,
                        },
                        completion: {
                            autoImport: true,
                        },
                        useWorkspaceDependencies: true,
                    },
                },
            },
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
