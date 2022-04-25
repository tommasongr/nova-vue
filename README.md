![](https://raw.githubusercontent.com/tommasongr/nova-vue/master/assets/nova-vue.png)

# Vue for Nova editor

Provides Vue syntax and language server support for Panic's macOS code editor, [Nova](https://panic.com/nova/).

**Now with Volar as the default language server!**

## Prerequisites

The extension supports both **Volar** and **Vetur** language servers. Volar is the new officially recommended server, therefore has become also the default choice in Vue for Nova.

Since there are now two different server options, neither of them come bundled with the extension. Please follow the steps below to install the server of your choice or even both of them. You will be able to switch between the two later.

### Volar setup

To setup the Volar server start by installing the actual server package:

```
npm install --global @volar/vue-language-server
```

After that, if you haven't already, install the typescript package:

```
npm install --global typescript
```

#### Global installation notice

As you may have noticed we installed both packages globally (`--global`). That's because the extension will try to automatically source the executables from those locations. If you want to use instances installed somewhere else on your system you can manually specify the paths to the `vue-language-server` executable and the `tsserverlibrary.js` script from the Volar section of the extension preferences.

### Vetur setup (legacy)

To setup the Vetur server, please install the `vls` executable with the following command:

```
npm install --global vls@0.7.4
```

#### Version lock notice

As you may have noticed we installed a specific version (`0.7.4`) of the package. That's because after some tests this is the latest working version of Vetur we successfully setup in Nova. Whenever we will find other working versions we will post them here.

#### Global installation notice

As you may have noticed we installed the package globally (`--global`). That's because the extension will try to automatically source the executable from that location. If you want to use an instance installed somewhere else on your system you can manually specify the path to the `vls` executable from the Vetur section of the extension preferences.

---

### PUG in templates

In order to use PUG in your templates, please make sure to have installed an extension that provides the syntax definition for it before running Vue for Nova. Otherwise you may encounter some crashes.

## Usage

Enable the extension in the extension library within Nova. Enjoy.

## Features

### Vue syntax 🖋

Vue for Nova defines the syntax for `.vue` files.

### Vue language server 🔥

A language server offers advanced code features like code completion, intellisense and so on.

You can choose between Volar or Vetur.

### Vue scaffold clips 📋

Vue for Nove comes with two simple scaffolding clips. One for Vue 3 with the setup function and one for Vue 2.

### Special theming 🎨

Vue for Nova offers an easy way to improve the syntax highlighting in a Vue file. Have a look!

![Special theming](https://raw.githubusercontent.com/tommasongr/nova-vue/master/Images/docs/docs-special_theming-01.png)

All themes which support this feature are listed [here](https://github.com/tommasongr/nova-vue/blob/master/THEMES.md#supported-themes).

*If you are a theme curator interested in implementing this feature, please check out the available hooks [here](https://github.com/tommasongr/nova-vue/blob/master/THEMES.md#hooks).*

## Contributing 🤝

**Everyone interested is more than welcomed to contribute to the extension!**

All you have to do to get up and running with the development is to fork the GitHub repository, downloaded it locally on your machine and rename the folder to `Vue.novaextension`.

After that open the extension folder with Nova and in the extension menu click on `Activate Project as Extension` (if you don't see the command you may have to check the relative flag in the Nova general settings). That's it!

Thanks in advance!
