let client

async function reload() {
    deactivate()
    console.log('Reloading...')
    await asyncActivate()
}

async function installWrappedDependencies() {
    return new Promise((resolve, reject) => {
        const process = new Process('/usr/bin/env', {
            args: ['npm', 'install'],
            cwd: nova.extension.path,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: {
                NO_UPDATE_NOTIFIER: 'true',
            },
        })
        if (nova.inDevMode()) {
            process.onStdout((o) => console.log('installing:', o.trimRight()))
        }
        process.onStderr((e) => console.warn('installing:', e.trimRight()))
        process.onDidExit((status) => {
            if (status === 0) {
                resolve()
            } else {
                reject(new Error('failed to install'))
            }
        })
        process.start()
    })
}

async function asyncActivate() {
    await installWrappedDependencies()

    try {
        await installWrappedDependencies()
    } catch (err) {
        console.error('Failed to install')
        throw err
    }

    const pathToVls = nova.path.join(
        nova.extension.path,
        'node_modules/vls/bin/vls'
    )
    const serviceArgs = {
        path: pathToVls,
    }

    client = new LanguageClient(
        'tommasonegri.vue',
        'Vue Language Server',
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
