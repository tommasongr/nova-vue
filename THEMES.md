# Special theming 🎨

The extension offers an easy way to improve the highlighting in Vue files.

![Special theming](https://raw.githubusercontent.com/tommasongr/nova-vue/master/Vue.novaextension/Images/docs-special_theming-01.png)

### Hooks

If you are a theme curator these are all the available styling hooks:

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

-   [Handcrafted](https://extensions.panic.com/extensions/handengineering/handengineering.Handcrafted/) by Hand Engineering

### Add you theme

Feel free to open a pull request if you have implemented the feature in you theme and is not already listed.
