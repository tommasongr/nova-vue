console.info('main.js is being run')
try {
    console.info('Path:', nova.extension.path)
} catch (err) {
    console.error("Couldn't get path, error was:", err.message)
}

try {
    var pathToVls = nova.path.join(
        nova.extension.path,
        'node_modules/vls/bin/vls'
    )
    console.info('Constructed path to vls:', pathToVls)
    var serverOptions = {
        path: pathToVls,
        type: 'stdio',
    }
} catch (err) {
    console.error(
        'could not set path on serverOptions, error was:',
        err.message
    )
}

var clientOptions = {
    syntaxes: ['Vue'],
}
var client = new LanguageClient(
    'vls',
    'Vue', // instructions say: The name parameter is the name of the server that can potentially be shown to the user
    serverOptions,
    clientOptions
)

try {
    client.start()
} catch (err) {
    console.error("Couldn't start server, error was:", err.message)
} finally {
    console.info('Server was started')
}

client.onNotification('window/showMessage', (params) => {
    console.log('window/showMessage', JSON.stringify(params))
})

// post checking:

try {
    if (client.running) {
        console.info('gopls seems to be running')
        console.info(
            'Instance name:',
            client.name,
            'Language identifier:',
            client.identifier
        )
    }
} catch (err) {
    console.error(
        'No clue about why the client cannot communicate with gopls; error was: ',
        err.message
    )
}

// Cleaning up the log file
// exports.deactivate = function () {
//     try {
//         nova.fs.remove('/tmp/gopls.log')
//     } catch (err) {
//         console.error(
//             'Attempt to remove the gopls log resulted in an error:',
//             err
//         )
//     } finally {
//         console.info('Logs cleaned; uninstall finished.')
//     }
// }

// exports.activate = function () {
//   // Do work when the extension is activated
//   console.log("We have been activated!");
//   try {
//     client.start();
//   } catch (err) {
//     console.log(
//       "Couldn't activate client inside callback, error was:",
//       err.message
//     );
//   }
// };
