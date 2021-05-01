import { InformationView } from './informationView'
import { showNotification, getVlsVersion } from './helpers'
import { dependencyManagement } from 'nova-extension-utils'
import { VueLanguageServer } from './VueLanguageServer'

// Register a Nova command for starting Vue Language Server
nova.commands.register('tommasonegri.vue.commands.startServer', function () {
    showNotification(
        'vue-server-starting',
        'Vue is Warming Up...',
        "Don't worry, it won't take a while."
    )
    activate()
})

// Register a Nova command for stopping Vue Language Server
nova.commands.register('tommasonegri.vue.commands.stopServer', function () {
    showNotification(
        'vue-server-stopped',
        'Vue is Taking a Break',
        "When you are ready I'll be here for you."
    )
    deactivate()
})

// Array of all the settings shared between global environment and workspace
const settings = [
    // Completion
    'tommasonegri.vue.config.vetur.completion.autoImport',
    'tommasonegri.vue.config.vetur.completion.tagCasing',
    // Language Features
    'tommasonegri.vue.config.vetur.languageFeatures.codeActions',
    'tommasonegri.vue.config.vetur.languageFeatures.updateImportOnFileMove',
    // Validation
    'tommasonegri.vue.config.vetur.validation.interpolation',
    'tommasonegri.vue.config.vetur.validation.script',
    'tommasonegri.vue.config.vetur.validation.style',
    'tommasonegri.vue.config.vetur.validation.template',
    'tommasonegri.vue.config.vetur.validation.templateProps',
    // Experimental
    'tommasonegri.vue.config.vetur.experimental.templateInterpolationService',
    // Misc
    'tommasonegri.vue.config.vetur.misc.ignoreProjectWarning',
    'tommasonegri.vue.config.vetur.misc.useWorkspaceDependencies',
    // Developer
    'tommasonegri.vue.config.vetur.dev.logLevel',
]

// Array of all the setting specific for the global environment
const globalSettings = []

// Register a Nova command for restoring workspace settings
nova.commands.register(
    'tommasonegri.vue.commands.restoreWorkspaceSettings',
    function () {
        settings.forEach((setting) => {
            nova.workspace.config.remove(setting)
        })
    }
)

// Register a Nova command for restoring global environment settings
nova.commands.register(
    'tommasonegri.vue.commands.restoreExtensionSettings',
    function () {
        const allSettings = settings.concat(globalSettings)

        allSettings.forEach((setting) => {
            nova.config.remove(setting)
        })
    }
)

// Register a Nova command for opening extension preferences
nova.commands.register(
    'tommasonegri.vue.commands.openExtensionConfig',
    function () {
        nova.openConfig('com.tommasonegri.Vue')
    }
)
// Register a Nova command for opening project preferences
nova.commands.register(
    'tommasonegri.vue.commands.openWorkspaceConfig',
    function () {
        nova.workspace.openConfig()
    }
)

// Register a Nova command for reloading the extension
nova.commands.register('tommasonegri.vue.commands.reload', reload)

// Register a Nova command for clearing the dependencies
dependencyManagement.registerDependencyUnlockCommand(
    'tommasonegri.vue.commands.forceClearLock'
)

let langserver = null

// Initialize a new Nova Disposable object
const compositeDisposable = new CompositeDisposable()

async function asyncActivate() {
    // Instantiate the Information Sidebar
    const informationView = new InformationView()
    compositeDisposable.add(informationView)

    informationView.status = 'Warming up...'

    // If VLS isn't found, install it
    try {
        await dependencyManagement.installWrappedDependencies(
            compositeDisposable,
            {
                console: {
                    log: (...args) => {
                        if (nova.inDevMode()) {
                            console.log('dependencyManagement:', ...args)
                        }
                    },
                    info: (...args) => {
                        if (nova.inDevMode()) {
                            console.info('dependencyManagement:', ...args)
                        }
                    },
                    warn: (...args) => {
                        console.warn('dependencyManagement:', ...args)
                    },
                },
            }
        )
    } catch (err) {
        informationView.status = 'Failed to install'
        throw err
    }

    // Retrieve the VLS path
    const vlsPath = nova.path.join(
        dependencyManagement.getDependencyDirectory(),
        'node_modules',
        '.bin',
        'vls'
    )

    // If VLS hasn't been installed, display an error message and quit
    if (!vlsPath) {
        informationView.status = 'VLS not found'

        showNotification(
            'vls-not-found',
            'VLS Not Found',
            "The Vue Language Server hasn't been installed correctly. You may want to restart the server or open an issue. I'm sorry for this...",
            ['Restart', 'Open Issue', 'Ignore'],
            (reply) => {
                console.log(reply.actionIdx)
                switch (reply.actionIdx) {
                    case 0:
                        nova.commands.invoke('tommasonegri.vue.commands.reload')
                        break
                    case 1:
                        nova.openURL(
                            'https://github.com/tommasongr/nova-vue/issues'
                        )
                        break
                    case 2:
                        break
                }
            }
        )

        return
    } else {
        if (nova.inDevMode()) {
            console.info('Using VLS at:', vlsPath)
        }
    }

    // Instantiate the Vue Language Server
    langserver = new VueLanguageServer()

    // Add an event listener for when Vue Language Server stops
    compositeDisposable.add(
        langserver.languageClient.onDidStop((err) => {
            informationView.status = 'Stopped'

            // Display an error message and a restart button if the server stopped unexpectedly
            if (err) {
                let message = 'Vue Language Server stopped unexpectedly'
                message += `:\n\n${err.toString()}`
                message +=
                    '\n\nPlease report this, along with any output in the Extension Console.'

                nova.workspace.showActionPanel(
                    message,
                    {
                        buttons: ['Restart', 'Ignore'],
                    },
                    (index) => {
                        if (index == 0) {
                            nova.commands.invoke(
                                'tommasonegri.vue.commands.reload'
                            )
                        }
                    }
                )
            }
        })
    )

    // Retrieve the running VLS version to display in the Information Sidebar
    getVlsVersion()
        .then((version) => {
            console.log('VLS Version', version)
            informationView.vlsVersion = version
        })
        .catch((err) => {
            console.log('No VLS Version:', err)
        })

    informationView.status = 'Running'

    // Used for the when clause of the start/stop server command
    nova.workspace.config.set('tommasonegri.vue.serverRunning', true)
}

export function activate() {
    console.log('Activating Vue Language Server...')

    return asyncActivate()
        .then(() => {
            console.log('Hello from Vue 💎')
        })
        .catch((err) => {
            console.error('Failed to activate with error:', err)
            nova.workspace.showErrorMessage(err)
        })
}

export function deactivate() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate()
        langserver = null

        // Used for the when clause of the start/stop server command
        nova.workspace.config.set('tommasonegri.vue.serverRunning', false)
    }

    compositeDisposable.dispose()

    console.log('Goodbye from Vue 👋')
}

async function reload() {
    deactivate()

    console.log('Reloading Vue Language Server...')
    showNotification(
        'vue-reload',
        'Vue is Reloading...',
        "Don't worry, it won't take a while."
    )

    await asyncActivate()
}
