import { remark } from "remark";
import html from "remark-html";
import { expect, it } from "vitest";
import { remarkCodeWindow } from "../remark-code-window.js";

it("should render a code block with an empty header and footer wrappred in a div with default options", async () => {
  const markdown = "```js" + "\n" + "const foo = 'bar';" + "\n" + "```";

  const processor = remark()
    .use(remarkCodeWindow)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain("data-remark-code-window-wrapper");
  expect(result.toString()).toContain('data-remark-code-window-header=""');
  expect(result.toString()).toContain('data-remark-code-window-footer=""');
});

it("should render a code block with a filled header and footer wrappred in a div with default options", async () => {
  const markdown =
    '```js header="test-title" footer="test-footer"' +
    "\n" +
    "const foo = 'bar';" +
    "\n" +
    "```";

  const processor = remark()
    .use(remarkCodeWindow)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain("data-remark-code-window-wrapper");
  expect(result.toString()).toContain("test-title");
  expect(result.toString()).toContain("test-footer");
});

it("should render a code block with a filled header containing withespaces", async () => {
  const markdown =
    '```js header="test title" footer="test footer"' +
    "\n" +
    "const foo = 'bar';" +
    "\n" +
    "```";

  const processor = remark()
    .use(remarkCodeWindow)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).toContain("data-remark-code-window-wrapper");
  expect(result.toString()).toContain("test title");
  expect(result.toString()).toContain("test footer");
});

it("should render a code block without window", async () => {
  const markdown =
    "```js no-window" + "\n" + "const foo = 'bar';" + "\n" + "```";

  const processor = remark()
    .use(remarkCodeWindow)
    .use(html, { sanitize: false });

  const result = await processor.process(markdown);

  expect(result.toString()).not.toContain("data-remark-code-window-wrapper");
});
