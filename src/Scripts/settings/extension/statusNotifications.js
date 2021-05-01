function reload() {
    nova.commands.invoke('tommasonegri.vue.commands.reload')
}

nova.config.onDidChange(
    'tommasonegri.vue.config.extension.statusNotifications',
    reload
)
nova.workspace.config.onDidChange(
    'tommasonegri.vue.config.extension.statusNotifications',
    reload
)

function getExtensionSetting() {
    return nova.config.get(
        'tommasonegri.vue.config.extension.statusNotifications',
        'boolean'
    )
}

function getWorkspaceSetting() {
    const str = nova.workspace.config.get(
        'tommasonegri.vue.config.extension.statusNotifications',
        'string'
    )

    switch (str) {
        case 'Global Default':
            return null
        case 'Enable':
            return true
        case 'Disable':
            return false
        default:
            return null
    }
}

export default function isStatusNotificationsEnabled() {
    const workspaceConfig = getWorkspaceSetting()
    const extensionConfig = getExtensionSetting()

    return workspaceConfig === null ? extensionConfig : workspaceConfig
}
