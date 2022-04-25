const { showNotification } = require("../helpers")

const SETTINGS = require("../settings")

exports.VeturLanguageServer = class VeturLanguageServer {
  constructor() {
    if (nova.inDevMode()) console.log("Activating Vetur...")

    // Observe the configuration setting for the server's location, and restart the server on change
    nova.config.observe("tommasonegri.vue.config.vetur.path", function(path) {
      this.start(path)
    }, this)
  }

  deactivate() {
    this.stop()
  }

  async start(path) {
    if (this.languageClient) {
      this.languageClient.stop()
      nova.subscriptions.remove(this.languageClient)
    }

    // Use the default server path
    if (!path) {
      try {
        path = await this.globalPath
      } catch (err) {
        console.error(err)

        showNotification("vetur-not-found", "Vetur Not Found",
          'The "vetur" executable could not be found in your environment.',
          ["Help", "Ignore"],
          (reply) => {
            console.log(reply.actionIdx)
            switch (reply.actionIdx) {
              case 0:
                nova.openURL("https://github.com/tommasongr/nova-vue#vetur-setup-legacy")
                break
              case 2:
                break
            }
          }
        )

        return
      }
    } else if (nova.inDevMode()) {
      console.log("Vetur path (custom):", path)
    }

    // Create the client
    var serverOptions = {
      path: path
    }
    var clientOptions = {
      syntaxes: ["vue"],
      initializationOptions: {
        config: {
          vetur: {
            completion: {
              autoImport: SETTINGS.vetur.completionAutoImport(),
              tagCasing: SETTINGS.vetur.completionTagCasing(),
            },
            languageFeatures: {
              codeActions: SETTINGS.vetur.languageFeaturesCodeActions(),
              updateImportOnFileMove: SETTINGS.vetur.languageFeaturesUpdateImportOnFileMove(),
            },
            // Disabled by default for preventing xxx errors to show up
            validation: {
              interpolation: SETTINGS.vetur.validationInterpolation(),
              script: SETTINGS.vetur.validationScript(),
              style: SETTINGS.vetur.validationStyle(),
              template: SETTINGS.vetur.validationTemplate(),
              templateProps: SETTINGS.vetur.validationTemplateProps(),
            },
            experimental: {
              templateInterpolationService: SETTINGS.vetur.experimentalTemplateInterpolationService(),
            },
            dev: {
              logLevel: SETTINGS.vetur.devLogLevel(),
            },
            format: {
              enable: false,
            },
            ignoreProjectWarning: SETTINGS.vetur.miscIgnoreProjectWarning(),
            useWorkspaceDependencies: SETTINGS.vetur.miscUseWorkspaceDependencies()
          }
        }
      }
    }
    var client = new LanguageClient("tommasonegri.vue", "Vetur Language Server", serverOptions, clientOptions)

    try {
      client.start()

      // Add the client to the subscriptions to be cleaned up
      nova.subscriptions.add(client)
      this.languageClient = client
    }
    catch (err) {
      // If the .start() method throws, it's likely because the path to the language server is invalid
      showNotification("vetur-activation-error", "Vetur Activation Failed",
        "Something goes wrong during Vetur activation..."
      )

      if (nova.inDevMode()) console.error(err)
    }
  }

  stop() {
    if (this.languageClient) {
      this.languageClient.stop()
      nova.subscriptions.remove(this.languageClient)
      this.languageClient = null
    }
  }

  get globalPath() {
    return new Promise((resolve, reject) => {
      const process = new Process("/usr/bin/env", {
        cwd: nova.workspace.path,
        args: ["which", "vls"],
        stdio: ["ignore", "pipe", "pipe"],
        shell: true,
      })

      let path = ""
      let err = ""

      process.onStdout(output => path += output.trim())
      process.onStderr(error_output => err += error_output)

      process.onDidExit(status => {
        if (status == 1 && path.length == 0) reject(err)

        if (status === 0 && nova.fs.access(path, nova.fs.X_OK)) {
          if (nova.inDevMode()) console.log("Vetur path (global):", path)

          resolve(path)
        } else {
          reject("Vetur executable not found")
        }
      })

      process.start()
    })
  }
}
