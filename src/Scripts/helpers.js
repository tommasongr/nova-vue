import isStatusNotificationsEnabled from './settings/extension/statusNotifications'

/**
 * @param {string} id Notification ID
 * @param {string} title Notification Title
 * @param {boolean} showAlways Whether to override the user notifications settings
 * @param {string=} body Notification Body
 * @param {[string]=} actions Notification Action
 * @param {function(any)=} handler Notification Handler
 */
export function showNotification(
    id,
    title,
    showAlways,
    body,
    actions,
    handler
) {
    if (showAlways || isStatusNotificationsEnabled()) {
        let request = new NotificationRequest(id)

        request.title = title
        if (body) {
            request.body = body
        }
        if (actions) {
            request.actions = actions
        }

        nova.notifications
            .add(request)
            .then((reply) => {
                if (handler) {
                    handler(reply)
                }
            })
            .catch((err) => console.error(err, err.stack))
    }
}

export async function getVlsVersion() {
    return new Promise((resolve, reject) => {
        const process = new Process('/usr/bin/env', {
            args: ['npm', 'view', 'vls', 'version'],
            stdio: ['ignore', 'pipe', 'ignore'],
        })
        let str = ''

        process.onStdout((versionString) => {
            str += versionString.trim()
        })

        process.onDidExit((status) => {
            if (status === 0) {
                resolve(str)
            } else {
                reject(status)
            }
        })

        process.start()
    })
}
