import ensureInstallation from './install'
import { showNotification, wrapCommand } from './helpers'
import isVeturModeEnabled from './isVeturModeEnabled'
import { dependencyManagement } from 'nova-extension-utils'
import { VueLanguageServer } from './VueLanguageServer'

// Register a Nova command for opening project preferences
nova.commands.register(
    'tommasonegri.vue.commands.openWorkspaceConfig',
    wrapCommand(function openWorkspaceConfig(workspace) {
        workspace.openConfig()
    })
)

// Register a Nova command for reloading the extension
nova.commands.register('tommasonegri.vue.commands.reload', reload)

// Register a Nova command for clearing the dependencies
dependencyManagement.registerDependencyUnlockCommand(
    'tommasonegri.vue.commands.forceClearLock'
)

let langserver = null

// Initialize a new Nova Disposable object
// Read more: https://docs.nova.app/api-reference/disposable/
const compositeDisposable = new CompositeDisposable()

async function asyncActivate() {
    try {
        await ensureInstallation(compositeDisposable)

        langserver = new VueLanguageServer()

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

    compositeDisposable.dispose()

    console.log('Goodbye from Vue!')
}

async function reload() {
    deactivate()
    console.log('Reloading Vue Server...')
    await asyncActivate()
}
