// EXTENSION
const { languageServer } = require("./settings/extension/languageServer")
// VETUR
const { completionAutoImport } = require("./settings/vetur/completionAutoImport")
const { completionTagCasing } = require("./settings/vetur/completionTagCasing")
const { languageFeaturesCodeActions } = require("./settings/vetur/languageFeaturesCodeActions")
const { languageFeaturesUpdateImportOnFileMove } = require("./settings/vetur/languageFeaturesUpdateImportOnFileMove")
const { validationInterpolation } = require("./settings/vetur/validationInterpolation")
const { validationScript } = require("./settings/vetur/validationScript")
const { validationStyle } = require("./settings/vetur/validationStyle")
const { validationTemplate } = require("./settings/vetur/validationTemplate")
const { validationTemplateProps } = require("./settings/vetur/validationTemplateProps")
const { experimentalTemplateInterpolationService } = require("./settings/vetur/experimentalTemplateInterpolationService")
const { miscUseWorkspaceDependencies } = require("./settings/vetur/miscUseWorkspaceDependencies")
const { miscIgnoreProjectWarning } = require("./settings/vetur/miscIgnoreProjectWarning")
const { devLogLevel } = require("./settings/vetur/devLogLevel")

const globalSettingsKeys = [
  "tommasonegri.vue.config.extension.languageServer",
  "tommasonegri.vue.config.volar.path",
  "tommasonegri.vue.config.volar.typescript.tsdk",
  "tommasonegri.vue.config.vetur.path",
  "tommasonegri.vue.config.vetur.completion.autoImport",
  "tommasonegri.vue.config.vetur.completion.tagCasing",
  "tommasonegri.vue.config.vetur.languageFeatures.codeActions",
  "tommasonegri.vue.config.vetur.languageFeatures.updateImportOnFileMove",
  "tommasonegri.vue.config.vetur.validation.interpolation",
  "tommasonegri.vue.config.vetur.validation.script",
  "tommasonegri.vue.config.vetur.validation.style",
  "tommasonegri.vue.config.vetur.validation.template",
  "tommasonegri.vue.config.vetur.validation.templateProps",
  "tommasonegri.vue.config.vetur.misc.ignoreProjectWarning",
  "tommasonegri.vue.config.vetur.misc.useWorkspaceDependencies",
  "tommasonegri.vue.config.vetur.experimental.templateInterpolationService",
  "tommasonegri.vue.config.vetur.dev.logLevel"
]

const workspaceSettingsKeys = [
  "tommasonegri.vue.config.extension.languageServer",
  "tommasonegri.vue.config.vetur.completion.autoImport",
  "tommasonegri.vue.config.vetur.completion.tagCasing",
  "tommasonegri.vue.config.vetur.languageFeatures.codeActions",
  "tommasonegri.vue.config.vetur.languageFeatures.updateImportOnFileMove",
  "tommasonegri.vue.config.vetur.validation.interpolation",
  "tommasonegri.vue.config.vetur.validation.script",
  "tommasonegri.vue.config.vetur.validation.style",
  "tommasonegri.vue.config.vetur.validation.template",
  "tommasonegri.vue.config.vetur.validation.templateProps",
  "tommasonegri.vue.config.vetur.misc.ignoreProjectWarning",
  "tommasonegri.vue.config.vetur.misc.useWorkspaceDependencies",
  "tommasonegri.vue.config.vetur.experimental.templateInterpolationService",
  "tommasonegri.vue.config.vetur.dev.logLevel"
]

const deprecatedSettingsKeys = [
  "tommasonegri.vue.config.extension.statusNotifications",
  "tommasonegri.vue.serverRunning"
]

module.exports = {
  languageServer,
  vetur: {
    completionAutoImport,
    completionTagCasing,
    languageFeaturesCodeActions,
    languageFeaturesUpdateImportOnFileMove,
    validationInterpolation,
    validationScript,
    validationStyle,
    validationTemplate,
    validationTemplateProps,
    experimentalTemplateInterpolationService,
    miscUseWorkspaceDependencies,
    miscIgnoreProjectWarning,
    devLogLevel,
  },
  globalSettingsKeys,
  workspaceSettingsKeys,
  deprecatedSettingsKeys
}
