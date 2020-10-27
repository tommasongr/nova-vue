# Special theming 🎨

The extension offers an easy way to improve the highlighting in Vue files.

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

## Supported themes

-   [Handcrafted](https://extensions.panic.com/extensions/handengineering/handengineering.Handcrafted/) by Hand Engineering (Coming soon)
-   [NightOwls](https://extensions.panic.com/extensions/samk/samk.NightOwls/) by Sam K

### Add you theme

Feel free to open a pull request if you have implemented the feature in you theme and is not already listed.

**WARNING**: Use a web capable link from [extensions.panic.com](https://extensions.panic.com) since GitHub doesn't recognize Mac App's URIs
