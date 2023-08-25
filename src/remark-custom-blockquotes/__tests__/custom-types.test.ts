import { remark } from 'remark';
import html from 'remark-html';
import { expect, it } from 'vitest';
import { remarkCustomBlockquotes } from '..';

it('should remove the prefix and insert a className in the blockquote element', async () => {
  const markdown = '> tip: simple text';

  const processor = remark()
    .use(remarkCustomBlockquotes, {
      types: [{ prefix: 'tip', className: 'tip-example' }],
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('class="tip-example"');
  expect(result.toString()).not.toContain('tip:');
});

it('should ignore non registered prefixes', async () => {
  const markdown = '> tip: simple text' + '\n' + '> caution: dangerous';

  const processor = remark()
    .use(remarkCustomBlockquotes, {
      types: [{ prefix: 'tip', className: 'tip-example' }],
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('class="tip-example"');
  expect(result.toString()).not.toContain('tip:');
  expect(result.toString()).toContain('caution:');
});

it('should ignore registered prefixes when they are not the first word', async () => {
  const markdown =
    '> tip: simple text' + '\n' + '> just another tip: simple text';

  const processor = remark()
    .use(remarkCustomBlockquotes, {
      types: [{ prefix: 'tip', className: 'tip-example' }],
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('class="tip-example"');
  expect(result.toString()).toContain('just another tip');
});

it('should keep other elements intacteds', async () => {
  const markdown = '> tip: simple *text* or `text`';

  const processor = remark()
    .use(remarkCustomBlockquotes, {
      types: [{ prefix: 'tip', className: 'tip-example' }],
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('class="tip-example"');
  expect(result.toString()).toContain('em');
  expect(result.toString()).toContain('code');
});
