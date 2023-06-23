# MD + SOME STUFF I LIKE

This is a custom flavor of Markdown that I use for my own projects. It's a bit opinionated, but I think it's pretty nice.

## Custom syntax

- [x] "Window" for code blocks with a title, footer, and copy button 

```
----------------
| title [copy] |
----------------
| code         |
----------------
| footer       |
----------------
```

- [x] Unwrapped code blocks

```
----------------
| code         |
----------------
```

- [x] Special blockquotes syntax with custom types

```md
> warning: this is a warning
> info: this is an info
> danger: this is a danger
> tip: this is a danger
```

- [x] Auto lazy loaded images with a placeholder class name

```md
![alt text](image.png)
```

- [ ] Auto lite youtube embeds

- [x] Auto "external link" icon for links that are not on the same domain

## Done through external plugins

- [ ] Github flavored markdown
- [ ] Automatic table of contents
- [ ] Title anchors
- [ ] Footnotes
- [ ] Emoji
- [ ] Math

## Notes

- Most of the custom syntax should be done through a custom remark plugin
- Separate remark and rehype plugins
- Monorepo with a core package and a bunch of plugins
- Browser preview
