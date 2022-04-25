const { showNotification } = require("../helpers")

exports.VolarLanguageServer = class VolarLanguageServer {
  constructor() {
    if (nova.inDevMode()) console.log("Activating Volar...")

    // Observe the configuration setting for the server's location, and restart the server on change
    nova.config.observe("tommasonegri.vue.config.volar.path", function(path) {
      this.start(path, nova.config.get("tommasonegri.vue.config.volar.typescript.path"))
    }, this)
    nova.config.onDidChange("tommasonegri.vue.config.volar.typescript.path", function(path) {
      this.start(nova.config.get("tommasonegri.vue.config.volar.path"), path)
    }, this)
  }

  deactivate() {
    this.stop()
  }

  async start(path, typescriptPath) {
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

        showNotification("volar-not-found", "Volar Not Found",
          'The "volar" executable could not be found in your environment.',
          ["Help", "Ignore"],
          (reply) => {
            console.log(reply.actionIdx)
            switch (reply.actionIdx) {
              case 0:
                nova.openURL("https://github.com/tommasongr/nova-vue#volar-setup")
                break
              case 2:
                break
            }
          }
        )

        return
      }
    } else if (nova.inDevMode()) {
      console.log("Volar path (custom):", path)
    }

    // Use the default TypeScript server path
    if (!typescriptPath) {
      try {
        typescriptPath = await this.typescriptGlobalPath
      } catch (err) {
        console.error(err)

        showNotification("typescript-not-found", "TypeScript Not Found",
          "Volar language server needs TypeScript to work correctly.",
          ["Help", "Ignore"],
          (reply) => {
            console.log(reply.actionIdx)
            switch (reply.actionIdx) {
              case 0:
                nova.openURL("https://github.com/tommasongr/nova-vue#volar-setup")
                break
              case 2:
                break
            }
          }
        )

        return
      }
    } else if (nova.inDevMode()) {
      console.log("TypeScript path (custom):", typescriptPath)
    }

    // Create the client
    const serverOptions = {
      path: path,
      args: ["--stdio"],
      type: "stdio"
    }
    const clientOptions = {
      syntaxes: ["vue"],
      initializationOptions: {
        typescript: {
          serverPath: typescriptPath,
        },
        languageFeatures: {
          references: true,
          implementation: true,
          definition: true,
          typeDefinition: true,
          callHierarchy: true,
          hover: true,
          rename: true,
          renameFileRefactoring: true,
          signatureHelp: true,
          codeAction: true,
          workspaceSymbol: true,
          completion: {
            defaultTagNameCase: "both",
            defaultAttrNameCase: "kebabCase",
            getDocumentNameCasesRequest: false,
            getDocumentSelectionRequest: true,
          },
          documentHighlight: true,
          documentLink: true,
          codeLens: { showReferencesNotification: true },
          semanticTokens: true,
          diagnostics: true,
          schemaRequestService: true,
        },
        documentFeatures: {
          selectionRange: true,
          foldingRange: true,
          linkedEditingRange: true,
          documentSymbol: true,
          documentColor: true,
          documentFormatting: true
        }
      }
    }
    const client = new LanguageClient("tommasonegri.vue", "Volar Language Server", serverOptions, clientOptions)

    try {
      client.start()

      // Add the client to the subscriptions to be cleaned up
      nova.subscriptions.add(client)
      this.languageClient = client
    }
    catch (err) {
      // If the .start() method throws, it's likely because the path to the language server is invalid
      showNotification("volar-activation-error", "Volar Activation Failed",
        "Something goes wrong during Volar activation..."
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
        args: ["which", "vue-language-server"],
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
          if (nova.inDevMode()) console.log("Volar path (global):", path)

          resolve(path)
        } else {
          reject("Volar executable not found")
        }
      })

      process.start()
    })
  }

  get typescriptGlobalPath() {
    return new Promise((resolve, reject) => {
      const process = new Process("/usr/bin/env", {
        cwd: nova.workspace.path,
        args: ["npm", "root", "-g"],
        stdio: ["ignore", "pipe", "pipe"],
        shell: true,
      })

      let npmPath = ""
      let path = ""
      let err = ""

      process.onStdout(output => npmPath += output.trim())
      process.onStderr(error_output => err += error_output)

      process.onDidExit(status => {
        if (status == 1 && npmPath.length == 0) reject(err)

        if (status === 0) {
          path = nova.path.join(npmPath, "/typescript/lib/tsserverlibrary.js")

          if (nova.fs.access(path, nova.fs.F_OK)) {
            if (nova.inDevMode()) console.log("TypeScript path (global):", path)

            resolve(path)
          } else {
            reject("TypeScript server not found")
          }
        } else {
          reject("TypeScript server not found. Impossible to access NPM global root directory.")
        }
      })

      process.start()
    })
  }
}
