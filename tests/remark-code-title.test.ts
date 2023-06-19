import { test, expect } from 'vitest';
import { remark } from 'remark';
import { remarkCodeWindow } from '../src';
import html from 'remark-html';

test('should render a code block with an empty header and footer wrappred in a div', async () => {
  const markdown = `
    \`\`\`js
    const foo = 'bar';
    \`\`\`
  `.trim();

  const processor = remark()
    .use(remarkCodeWindow)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toMatchInlineSnapshot();

});
