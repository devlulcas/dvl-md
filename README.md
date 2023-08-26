# MD + SOME STUFF I LIKE

This is a custom flavor of Markdown that I use for my own projects. It's a bit opinionated, but I think it's pretty nice.

## Custom syntax

- [x] "Window" for code blocks with a title, footer, and copy button

```txt
----------------
| title [copy] |
----------------
| code         |
----------------
| footer       |
----------------
```

- [x] Unwrapped code blocks

```txt
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

## I don't wanna to deal with that right now, so it should be done through external plugins (sorry)

> **Use those in conjunction to get better results**

- [ ] [Automatic table of contents](https://github.com/remarkjs/remark-toc)
- [ ] [Title ids](https://github.com/rehypejs/rehype-slug)
- [ ] [Title anchors](https://github.com/rehypejs/rehype-autolink-headings)
- [ ] [Mermaid](https://github.com/remcohaszing/rehype-mermaidjs)

## Notes

- Most of the custom syntax should be done through a custom remark plugin
- Browser preview
