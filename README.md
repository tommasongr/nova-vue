![](https://raw.githubusercontent.com/tommasongr/nova-vue/master/assets/nova-vue.png)

# Vue for Nova editor

This is a plugin providing Vue language support for the new [Nova editor by Panic](https://panic.com/nova/). Inspired by [Vetur](https://github.com/vuejs/vetur) and many other great Vue tools.

> WARNING: If you want to use PUG in your template you first have to install an extension that provides you PUG syntax, otherwise Nova will crash. Panic has been notified of this issue.

## Features

### Vue Language Server 🔥

This extension provides a fully featured support for [VLS](https://github.com/vuejs/vetur/tree/master/server) (Vue Language Server). VLS is a Language Server compatible with the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) and it is developed within the Vetur project.

The Vue Language Server offers advanced code features like code completion, intellisense and so on.

#### Configurable Settings ⚙️

From **v4.0** almost all the settings available for the Vue Language Server are configurable both globally and per project.

![Special theming](https://raw.githubusercontent.com/tommasongr/nova-vue/master/Vue.novaextension/Images/docs/docs-vue_language_server_settings.png)

---

### Vue Information Sidebar 🤔

From **v4.0** the extension ships with a new Information Sidebar! You can see the current status of the server and the version of the server currently in execution. Right now is pretty minimal but I hope to expand on it in the future releases.

![Special theming](https://raw.githubusercontent.com/tommasongr/nova-vue/master/Vue.novaextension/Images/docs/docs-vue_information_sidebar.png)

---

### Status Notifications 🚦

From **v4.0** the extension ships with an improved notification system, giving you more information about what is going on. If you don't like them you can of course disable this feature from the settings.

---

### Special Theming 🎨

Vue for Nova offers an easy way to improve the syntax highlighting in a Vue file. Have a look!

![Special theming](https://raw.githubusercontent.com/tommasongr/nova-vue/master/Vue.novaextension/Images/docs/docs-special_theming-01.png)

#### Supported themes

All themes which support this feature are listed [here](https://github.com/tommasongr/nova-vue/blob/master/THEMES.md#supported-themes).

#### For Developers

If you are a developer interested in implementing this feature in your theme check out the available hooks [here](https://github.com/tommasongr/nova-vue/blob/master/THEMES.md#hooks).

## State of development 🧑‍💻

### Supported features

-   [x] Generic Vue Tags
-   [x] Template Tag
-   [x] Script Tag
-   [x] Style Tag
-   [x] Vue Directives
-   [x] Vue Interpolation
-   [x] Completions for HTML, CSS, JS and WebAPI
-   [x] Completions for Vue API
-   [x] Completions for Vue Directives
-   [x] Completions Vue Events (@click)
-   [x] Support for PUG
-   [x] Support for SCSS, SASS, LESS and PostCSS
-   [x] Support for JavaScript, TypeScript and CoffeeScript
-   [x] Vue Clips (based on [Vue VSCode Snippets](https://github.com/sdras/vue-vscode-snippets))
-   [x] Support for Vue Language Server
-   [x] Configurable settings for Vue Language Server
-   [x] Refined class selectors for improved highlighting

### Features on their way

-   [ ] Support for jade (waiting for syntaxes)
-   [ ] Support for stylus (waiting for syntaxes)

## Contributing 🤝

You are welcome to contribute in any way you can think of. Seriously, I am not an expert in these things 😅.

Maybe take a look at the [CONTRIBUTING guidelines](./CONTRIBUTING.md). Nothing fancy don't worry.

Thanks!
