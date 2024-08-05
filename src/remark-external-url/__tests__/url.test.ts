import { remark } from "remark";
import html from "remark-html";
import { expect, it } from "vitest";
import { remarkExternalUrl } from "../remark-external-url.js";

it("should add _blank in links that start with http", async () => {
  const markdown = "[website](https://www.example.com)";

  const processor = remark()
    .use(remarkExternalUrl)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain('target="_blank"');
});

it("should not add _blank in links if the website domain is the same as the in the domain option", async () => {
  const markdown = "[website](https://www.example.com)";

  const processor = remark()
    .use(remarkExternalUrl, { domain: "example.com" })
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).not.toContain('target="_blank"');
});

it("should ignore false links", async () => {
  const markdown = "https://www.example.com";

  const processor = remark()
    .use(remarkExternalUrl)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).not.toContain('target="_blank"');
});

it("should ignore images", async () => {
  const markdown = "![alt](https://www.example.com/image)";

  const processor = remark()
    .use(remarkExternalUrl)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).not.toContain('target="_blank"');
});
