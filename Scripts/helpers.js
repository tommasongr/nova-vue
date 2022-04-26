/**
 * @param {string} id Notification ID
 * @param {string} title Notification Title
 * @param {string=} body Notification Body
 * @param {[string]=} actions Notification Action
 * @param {function(any)=} handler Notification Handler
 */
exports.showNotification = function(id, title, body, actions, handler) {
  let request = new NotificationRequest(id)

  request.title = title
  if (body) request.body = body
  if (actions) request.actions = actions

  nova.notifications.add(request).then(reply => {
    if (handler) handler(reply)
  }, err => console.error(err))
}
