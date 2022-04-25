function reload() {
    nova.commands.invoke('tommasonegri.vue.commands.reload')
}

nova.config.onDidChange(
    'tommasonegri.vue.config.vetur.completion.tagCasing',
    reload
)
nova.workspace.config.onDidChange(
    'tommasonegri.vue.config.vetur.completion.tagCasing',
    reload
)

function getExtensionSetting() {
    return nova.config.get(
        'tommasonegri.vue.config.vetur.completion.tagCasing',
        'string'
    )
}

function getWorkspaceSetting() {
    const str = nova.workspace.config.get(
        'tommasonegri.vue.config.vetur.completion.tagCasing',
        'string'
    )

    switch (str) {
        case 'Global Default':
            return null
        case 'initial':
            return str
        case 'kebab':
            return str
        default:
            return null
    }
}

exports.completionTagCasing = function() {
    const workspaceConfig = getWorkspaceSetting()
    const extensionConfig = getExtensionSetting()

    return workspaceConfig === null ? extensionConfig : workspaceConfig
}
