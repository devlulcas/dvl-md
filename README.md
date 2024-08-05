# MD + SOME STUFF I LIKE

This is a custom flavor of Markdown that I use for my own projects. It's a bit opinionated, but I think it's pretty nice.

```sh
npm i --save-dev devlulcas-md #npm
pnpm add -D devlulcas-md #pnpm
```

> Use it in conjunction with remark/rehype from unified

## Custom syntax

- [x] "Window" for code blocks with a title, footer, and copy button

```md
\`\`\`js header="Variable declaration" footer="test-footer"
const foo = 'bar';
\`\`\`
```

```ts
import { remark } from "remark";
import remarkHtml from "remark-html";
import { expect, it } from "vitest";
import * as dvl from "devlulcas-md";

const markdown =
  '```js header="test title" footer="test footer"' +
  "\n" +
  "const foo = 'bar';" +
  "\n" +
  "```";

const processor = remark()
  .use(dvl.remarkCodeWindow)
  .use(html, { sanitize: false });

const html = await processor.process(markdown);

console.log(html.toString());
```

```html
<div data-remark-code-window-wrapper class="remark-code-window-wrapper">
    <div class="remark-code-window-header" data-remark-code-window-header="Variable declaration">
        Variable declaration
        <button class="remark-code-window-copy" data-remark-code-window-copy-button="Copy">Copy📋</button>
    </div>
    <pre>
        <code class="language-js">
            const foo = 'bar';
        </code>
    </pre>
    <div class="remark-code-window-footer" data-remark-code-window-footer="test-footer">test-footer</div>
</div>
```

- [x] Special blockquotes syntax with custom types

```md
> warning: this is a warning
> info: this is an info
> danger: this is a danger
> tip: this is a danger
```

```ts
import { remark } from "remark";
import remarkHtml from "remark-html";
import { expect, it } from "vitest";
import * as dvl from "devlulcas-md";

const markdown = "> tip: simple text";

const processor = remark()
  .use(dvl.remarkCustomBlockquotes, { types: [{ prefix: "tip", className: "tip" }] })
  .use(html, { sanitize: false });

const html = await processor.process(markdown);

console.log(html.toString());
```

```html
<blockquote class="tip">
    <p> simple text</p>
</blockquote>
```

- [x] Auto lazy loaded images with a placeholder class name

```md
![alt text](image.png "test image")
```

```ts
import { remark } from "remark";
import remarkHtml from "remark-html";
import { expect, it } from "vitest";
import * as dvl from "devlulcas-md";

const markdown = '![alt text](image.png "test image")';

const processor = remark()
  .use(remarkBetterImages)
  .use(html, { sanitize: false });

const html = await processor.process(markdown);

console.log(html.toString());
```

```html
<p>
    <figure>
        <img src="/image.png" alt="alt text" title="test image" loading="lazy" class="remark-better-images-placeholder">
        <figcaption>test image</figcaption>
    </figure>
</p>
```

## I don't wanna to deal with that right now, so it should be done through external plugins (sorry)

> **Use those in conjunction to get better results**

- [ ] [Automatic table of contents](https://github.com/remarkjs/remark-toc)
- [ ] [Title ids](https://github.com/rehypejs/rehype-slug)
- [ ] [Title anchors](https://github.com/rehypejs/rehype-autolink-headings)
- [ ] [Mermaid](https://github.com/remcohaszing/rehype-mermaidjs)

## Notes

- Most of the custom syntax should be done through a custom remark plugin
