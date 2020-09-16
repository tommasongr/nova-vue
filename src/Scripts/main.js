let client

async function reload() {
    deactivate()
    console.log('Reloading...')
    await asyncActivate()
}

async function asyncActivate() {
    let serviceArgs

    try {
        var pathToVls = nova.path.join(
            nova.extension.path,
            'node_modules/vls/bin/vls'
        )
        serviceArgs = {
            path: pathToVls,
        }
    } catch (err) {
        console.error(
            'Could not set path on serverOptions, error was:',
            err.message
        )
    }

    client = new LanguageClient(
        'tommasonegri.vue',
        'Vue',
        {
            type: 'stdio',
            ...serviceArgs,
            env: {
                WORKSPACE_DIR: nova.workspace.path ?? '',
            },
        },
        {
            syntaxes: ['vue'],
        }
    )

    client.start()
}

export function activate() {
    console.log('Activating...')
    return asyncActivate()
        .catch((err) => {
            console.error('Failed to activate')
            console.error(err)
        })
        .then(() => {
            console.log('Activated')
        })
}

export function deactivate() {
    client?.stop()
}
