import assert from "node:assert/strict";
import { test } from "node:test";
import { ParagraphAPI } from "../dist/index.mjs";
import { createContentBody, updateContentBody } from "../dist/zod.mjs";

test("rich newsletter schemas and resource transport preserve the full document", async () => {
  const bodyJson = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Keep these words.",
            marks: [{ type: "bold" }],
          },
        ],
      },
      {
        type: "image",
        attrs: {
          src: "https://example.com/image.png",
          alt: "A blue square",
          width: 600,
        },
      },
      {
        type: "table",
        content: [
          {
            type: "tableRow",
            content: [
              {
                type: "tableCell",
                attrs: { colspan: 2 },
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "One merged cell" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const body = {
    subject: "Reviewed QA draft",
    preheader: "Exact document",
    bodyJson,
  };
  const create = createContentBody.parse({
    kind: "newsletter",
    title: "QA",
    body,
  });
  const update = updateContentBody.parse({ body });
  assert.deepEqual(create.body, body);
  assert.deepEqual(update.body, body);

  const requests = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    requests.push({
      url,
      method: options.method,
      body: JSON.parse(options.body),
    });
    return Response.json({
      id: "qa-content",
      kind: "newsletter",
      title: "QA",
      body,
    });
  };
  try {
    const api = new ParagraphAPI({ apiKey: "qa-local-test" });
    const saved = await api.content.create(create);
    const replaced = await api.content.update({ id: saved.id, ...update });
    assert.deepEqual(saved.body, body);
    assert.deepEqual(replaced.body, body);
    assert.deepEqual(
      requests.map((request) => request.body),
      [create, update],
    );
    assert.deepEqual(
      requests.map((request) => request.method),
      ["POST", "PATCH"],
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
