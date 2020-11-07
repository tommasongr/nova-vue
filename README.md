![](https://raw.githubusercontent.com/tommasongr/nova-vue/master/assets/nova-vue.png)

# Vue for Nova editor

This is a plugin providing Vue language support for the new [Nova editor from Panic](https://panic.com/nova/). Inspired by [Vetur](https://github.com/vuejs/vetur) and many other great Vue tools.

## Modes 🔥

The extension now support two different mode: **Classic** and **Vetur**! You can set it in the global extension preferences and also on a project based.

In the future I'll look into a way of combining the best of both worlds, in the meantime which one should you use? Of course is up to you 😉

### Vetur (default)

A complete Vetur like mode with all the great features you are already used to.

### Classic

Ad hoc completions for Nova and great snippets for faster development.

## Special theming 🎨

The extension offers an easy way to improve the highlighting in Vue file.

![Special theming](https://raw.githubusercontent.com/tommasongr/nova-vue/master/Vue.novaextension/Images/docs-special_theming-01.png)

### Hooks

This is an example of implementation with all the available hooks:

```css
/* Vue */

vue.html.tag.open,
vue.html.tag.close {
    color: #59be84;
}

vue.html.tag.name {
    color: #59be84;
    font-weight: bold;
}

vue.html.tag.attribute.shorthand-key {
    color: #59be84;
}

vue.html.tag.attribute.name,
vue.html.embedded.interpolation.bracket {
    color: #65c032;
    font-weight: bold;
}

vue.html.tag.attribute.argument {
    color: #59be84;
    font-weight: bold;
}

vue.html.tag.attribute.modifier {
    color: #59be84;
}
```

### Supported themes

All themes which support this feature are listed [here](https://github.com/tommasongr/nova-vue/blob/master/THEMES.md#supported-themes).

## State of development 🧑‍💻

### Features supported

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
-   [x] Support for typescript and coffeescript
-   [x] Support for scss, sass and less
-   [x] Vue Clips (based on [Vue VSCode Snippets](https://github.com/sdras/vue-vscode-snippets))
-   [x] Support for Vetur LSP
-   [x] Refined class selectors for improved highlighting

### Features on their way

-   [ ] Support for jade and pug (waiting for syntaxes)
-   [ ] Support for stylus and postcss (waiting for syntaxes)

## Contributing 🤝

You are welcome to contribute in any way you can think of. Seriously, I am not an expert in these things 😅.

Maybe take a look at the [CONTRIBUTING guidelines](./CONTRIBUTING.md). Nothing fancy don't worry.

Thanks!
