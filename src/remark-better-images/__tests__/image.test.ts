import { remark } from "remark";
import html from "remark-html";
import { expect, it } from "vitest";
import { remarkBetterImages } from "../remark-better-images.js";

it("should add lazy in images by default", async () => {
  const markdown = "![image](image.png)";

  const processor = remark()
    .use(remarkBetterImages)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  console.log(result.toString());

  expect(result.toString()).toContain('loading="lazy"');
});

it("should add a baseUrl in images that without a protocol in the url", async () => {
  const markdown = "![image](image.png)";

  const processor = remark()
    .use(remarkBetterImages, {
      baseUrl: "https://example.com",
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('src="https://example.com/image.png"');
});

it("should add a baseUrl in images that start with /", async () => {
  const markdown = "![image](/image.png)";

  const processor = remark()
    .use(remarkBetterImages, {
      baseUrl: "https://example.com",
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('src="https://example.com/image.png"');
});

it("should add a baseUrl in images that start with ./", async () => {
  const markdown = "![image](./image.png)";

  const processor = remark()
    .use(remarkBetterImages, {
      baseUrl: "https://example.com",
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('src="https://example.com/image.png"');
});

it("should add classNames passed", async () => {
  const markdown = "![image](./image.png)";

  const processor = remark()
    .use(remarkBetterImages, {
      baseUrl: "https://example.com",
      placeholderClassName: "custom-class",
    })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('class="custom-class"');
});

it("should add figure and figcaption when image has caption attr", async () => {
  const markdown = '![alt text](image.png "test image")';

  const processor = remark()
    .use(remarkBetterImages)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString().trim()).toBe(
    '<p><figure><img src="image.png" alt="alt text" title="test image" loading="lazy" class="remark-better-images-placeholder"><figcaption>test image</figcaption></figure></p>',
  );
});
