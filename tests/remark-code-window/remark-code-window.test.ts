import { test, expect } from 'vitest';
import { remark } from 'remark';
import { remarkCodeWindow } from '../../src';
import html from 'remark-html';

test('should render a code block with an empty header and footer wrappred in a div', async () => {
  const markdown = 
    "```js" + "\n" + "const foo = 'bar';" + "\n" + "```";

  const processor = remark()
    .use(remarkCodeWindow)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  console.log(result.toString());

  expect(result.toString()).toMatchInlineSnapshot(`
    "<div class=\\"remark-code-window-wrapper\\"><div class=\\"remark-code-window-header\\" data-remark-code-window-header=\\"\\"><button class=\\"remark-code-window-copy\\" data-remark-code-window-copy-button=\\"Copy\\">Copy📋</button></div><pre><code class=\\"language-js\\">    const foo = 'bar';
        \`\`\`
    </code></pre><div class=\\"remark-code-window-footer\\" data-remark-code-window-footer=\\"\\"></div></div>
    "
  `);
});
