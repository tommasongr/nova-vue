function getExtensionSetting() {
  return nova.config.get("tommasonegri.vue.config.extension.languageServer", "string")
}

function getWorkspaceSetting() {
  const str = nova.workspace.config.get("tommasonegri.vue.config.extension.languageServer", "string")

  switch (str) {
    case "Volar":
      return "Volar"
    case "Vetur":
      return "Vetur"
    default:
      return null
  }
}

exports.languageServer = function() {
  const workspaceConfig = getWorkspaceSetting()
  const extensionConfig = getExtensionSetting()

  return workspaceConfig === null ? extensionConfig : workspaceConfig
}
