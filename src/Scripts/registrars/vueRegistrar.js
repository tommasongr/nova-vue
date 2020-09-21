const vueJson = require('../snippets/vue.json')

class VueRegistrar {
    provideCompletionItems(editor, context) {
        let snippets = []

        for (let snippet in vueJson) {
            let item = new CompletionItem(
                vueJson[snippet].prefix,
                CompletionItemKind.Statement
            )

            item.documentation = vueJson[snippet].description
            item.insertText = vueJson[snippet].body.join('\n')
            item.tokenize = true

            snippets.push(item)
        }

        return snippets
    }
}

if (nova.config.get('tommasonegri.vue.config.snippets', 'boolean')) {
	nova.assistants.registerCompletionAssistant('vue', new VueRegistrar())
} else {
	console.log('Snippets disabled')
}

module.exports = VueRegistrar
