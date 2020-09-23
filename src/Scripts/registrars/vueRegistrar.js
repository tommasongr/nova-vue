const scaffoldJson = require('../snippets/scaffold.json')

class VueRegistrar {
    provideCompletionItems(editor, context) {
        let snippets = []

        for (let snippet in scaffoldJson) {
            let item = new CompletionItem(
                scaffoldJson[snippet].prefix,
                CompletionItemKind.Statement
            )

            item.documentation = scaffoldJson[snippet].description
            item.insertText = scaffoldJson[snippet].body.join('\n')
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
