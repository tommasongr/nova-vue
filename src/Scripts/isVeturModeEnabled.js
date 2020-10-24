import { showNotification } from './helpers'

function reload(newVal) {
    showNotification(
        'vue-mode-change',
        `Switching to ${newVal} mode!`,
        'Vue is currently reloading itself... Just a few seconds'
    )
    nova.commands.invoke('tommasonegri.vue.commands.reload')
}
nova.config.onDidChange('tommasonegri.vue.config.mode', reload)
nova.workspace.config.onDidChange('tommasonegri.vue.config.mode', reload)

function getExtensionSetting() {
    const str = nova.config.get('tommasonegri.vue.config.mode', 'string')

    switch (str) {
        case 'Classic':
            return false
        case 'Vetur':
            return true
        default:
            return null
    }
}

function getWorkspaceSetting() {
    const str = nova.workspace.config.get(
        'tommasonegri.vue.config.mode',
        'string'
    )

    switch (str) {
        case 'Classic':
            return false
        case 'Vetur':
            return true
        default:
            return null
    }
}

export default function isVeturModeEnabled() {
    const workspaceConfig = getWorkspaceSetting()
    const extensionConfig = getExtensionSetting()

    return workspaceConfig === null ? extensionConfig : workspaceConfig
}
