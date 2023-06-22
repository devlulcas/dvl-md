import { remark } from 'remark';
import html from 'remark-html';
import { expect, test } from 'vitest';
import { remarkBetterImages } from '..';

test('should add lazy in images by default', async () => {
  const markdown = '![image](image.png)';

  const processor = remark()
    .use(remarkBetterImages)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('loading="lazy"');
});

test('should add a baseUrl in images that without a protocol in the url', async () => {
  const markdown = '![image](image.png)';

  const processor = remark()
    .use(remarkBetterImages, {
      baseUrl: 'https://example.com',
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('src="https://example.com/image.png"');
});

test('should add a baseUrl in images that start with /', async () => {
  const markdown = '![image](/image.png)';

  const processor = remark()
    .use(remarkBetterImages, {
      baseUrl: 'https://example.com',
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('src="https://example.com/image.png"');
});

test('should add a baseUrl in images that start with ./', async () => {
  const markdown = '![image](./image.png)';

  const processor = remark()
    .use(remarkBetterImages, {
      baseUrl: 'https://example.com',
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('src="https://example.com/image.png"');
});

