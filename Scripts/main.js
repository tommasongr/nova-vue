const { VolarLanguageServer } = require("./servers/VolarLanguageServer")
const { VeturLanguageServer } = require("./servers/VeturLanguageServer")
const SETTINGS                = require("./settings")

let langserver = null

exports.activate = function() {
  console.log("Hello from Vue 💎")

  SETTINGS.deprecatedSettingsKeys.forEach(key => {
    nova.config.remove(key)
    nova.workspace.config.remove(key)
  })

  switch (SETTINGS.languageServer()) {
    case "Volar":
      langserver = new VolarLanguageServer()
      break
    case "Vetur":
      langserver = new VeturLanguageServer()
      break
  }
}

exports.deactivate = function() {
  // Clean up state before the extension is deactivated
  if (langserver) {
    langserver.deactivate()
    langserver = null
  }

  console.log("Goodbye from Vue 💎")
}

function reload() {
  deactivate()
  activate()
}

// Register Nova commands

nova.commands.register("tommasonegri.vue.commands.reload", reload)

nova.commands.register("tommasonegri.vue.commands.restoreExtensionSettings", () => {
  SETTINGS.globalSettingsKeys.forEach(key => {
    nova.config.remove(key)
  })
})

nova.commands.register("tommasonegri.vue.commands.restoreWorkspaceSettings", () => {
  SETTINGS.workspaceSettingsKeys.forEach(key => {
    nova.workspace.config.remove(key)
  })
})
