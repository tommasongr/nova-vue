import { dependencyManagement } from 'nova-extension-utils'

// Settings
import isCompletionAutoImportEnabled from './settings/completionAutoImport'
import isCompletionTagCasingEnabled from './settings/completionTagCasing'
import isLanguageFeaturesCodeActionsEnabled from './settings/languageFeaturesCodeActions'
import isLanguageFeaturesUpdateImportOnFileMoveEnabled from './settings/languageFeaturesUpdateImportOnFileMove'
import isValidationInterpolationEnabled from './settings/validationInterpolation'
import isValidationScriptEnabled from './settings/validationScript'
import isValidationStyleEnabled from './settings/validationStyle'
import isValidationTemplateEnabled from './settings/validationTemplate'
import isValidationTemplatePropsEnabled from './settings/validationTemplateProps'
import isExperimentalTemplateInterpolationServiceEnabled from './settings/experimentalTemplateInterpolationService'
import isMiscUseWorkspaceDependenciesEnabled from './settings/miscUseWorkspaceDependencies'
import isMiscIgnoreProjectWarningEnabled from './settings/miscIgnoreProjectWarning'
import isDevLogLevelEnabled from './settings/devLogLevel'

export class VueLanguageServer {
    constructor() {
        // Observe the configuration setting for the server's location, and restart the server on change
        nova.config.observe(
            'tommasonegri.vue.config.vls-path',
            function (path) {
                this.start(path)
            },
            this
        )
    }

    deactivate() {
        this.stop()
    }

    start(path) {
        if (this.languageClient) {
            this.languageClient.stop()
            nova.subscriptions.remove(this.languageClient)
        }

        // Use the default server path
        if (!path) {
            path = nova.path.join(
                dependencyManagement.getDependencyDirectory(),
                'node_modules',
                '.bin',
                'vls'
            )
        }

        // Create the client
        var serverOptions = {
            path: path,
        }
        var clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['vue'],

            initializationOptions: {
                config: {
                    vetur: {
                        completion: {
                            autoImport: isCompletionAutoImportEnabled(),
                            tagCasing: isCompletionTagCasingEnabled(),
                            scaffoldSnippetSources: '',
                        },
                        languageFeatures: {
                            codeActions: isLanguageFeaturesCodeActionsEnabled(),
                            updateImportOnFileMove: isLanguageFeaturesUpdateImportOnFileMoveEnabled(),
                        },
                        validation: {
                            // Disabled by default for preventing xxx errors to show up
                            interpolation: isValidationInterpolationEnabled(),
                            script: isValidationScriptEnabled(),
                            style: isValidationStyleEnabled(),
                            template: isValidationTemplateEnabled(),
                            templateProps: isValidationTemplatePropsEnabled(),
                        },
                        experimental: {
                            templateInterpolationService: isExperimentalTemplateInterpolationServiceEnabled(),
                        },
                        dev: {
                            logLevel: isDevLogLevelEnabled(),
                        },
                        format: {
                            enable: false,
                        },
                        ignoreProjectWarning: isMiscIgnoreProjectWarningEnabled(),
                        useWorkspaceDependencies: isMiscUseWorkspaceDependenciesEnabled(),
                    },
                },
            },
        }
        var client = new LanguageClient(
            'tommasonegri.vue',
            'Vue Language Server',
            serverOptions,
            clientOptions
        )

        try {
            // Start the client
            client.start()

            // Add the client to the subscriptions to be cleaned up
            nova.subscriptions.add(client)
            this.languageClient = client
        } catch (err) {
            if (nova.inDevMode()) {
                console.error(err)
            }
        }
    }

    stop() {
        if (this.languageClient) {
            this.languageClient.stop()
            nova.subscriptions.remove(this.languageClient)
            this.languageClient = null
        }
    }
}
