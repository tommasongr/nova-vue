function reload() {
    nova.commands.invoke('tommasonegri.vue.commands.reload')
}

nova.config.onDidChange('tommasonegri.vue.config.vetur.dev.logLevel', reload)
nova.workspace.config.onDidChange(
    'tommasonegri.vue.config.vetur.dev.logLevel',
    reload
)

function getExtensionSetting() {
    return nova.config.get(
        'tommasonegri.vue.config.vetur.dev.logLevel',
        'string'
    )
}

function getWorkspaceSetting() {
    const str = nova.workspace.config.get(
        'tommasonegri.vue.config.vetur.dev.logLevel',
        'string'
    )

    switch (str) {
        case 'Global Default':
            return null
        case 'INFO':
            return str
        case 'DEBUG':
            return str
        default:
            return null
    }
}

export default function isDevLogLevelEnabled() {
    const workspaceConfig = getWorkspaceSetting()
    const extensionConfig = getExtensionSetting()

    return workspaceConfig === null ? extensionConfig : workspaceConfig
}
