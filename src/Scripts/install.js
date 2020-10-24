import { dependencyManagement } from 'nova-extension-utils'

export default async (compositeDisposable) => {
    try {
        await dependencyManagement.installWrappedDependencies(
            compositeDisposable,
            {
                console: {
                    log: (...args) => {
                        console.log('dependencyManagement:', ...args)
                    },
                    info: (...args) => {
                        console.info('dependencyManagement:', ...args)
                    },
                    warn: (...args) => {
                        console.warn('dependencyManagement:', ...args)
                    },
                },
            }
        )
    } catch (err) {
        console.error('Unable to find or install extension', err, err.stack)
    }
}
