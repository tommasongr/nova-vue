function reload() {
    nova.commands.invoke('tommasonegri.vue.commands.reload')
}

nova.config.onDidChange(
    'tommasonegri.vue.config.vetur.validation.template',
    reload
)
nova.workspace.config.onDidChange(
    'tommasonegri.vue.config.vetur.validation.template',
    reload
)

function getExtensionSetting() {
    return nova.config.get(
        'tommasonegri.vue.config.vetur.validation.template',
        'boolean'
    )
}

function getWorkspaceSetting() {
    const str = nova.workspace.config.get(
        'tommasonegri.vue.config.vetur.validation.template',
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

export default function isValidationTemplateEnabled() {
    const workspaceConfig = getWorkspaceSetting()
    const extensionConfig = getExtensionSetting()

    return workspaceConfig === null ? extensionConfig : workspaceConfig
}
