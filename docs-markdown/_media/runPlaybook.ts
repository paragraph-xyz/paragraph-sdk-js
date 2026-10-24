import { ParagraphAPI } from "../src";

// Playbooks are scoped to the publication behind the API key
const api = new ParagraphAPI({ apiKey: "your-api-key" });

async function main() {
  // See what this publication can run, and what each Playbook accepts
  const { playbooks } = await api.playbooks.list();
  const changelog = playbooks.find((playbook) => playbook.key === "changelog");
  if (!changelog) throw new Error("This publication can't run the Changelog");

  // Point it at a public repository. This replaces the whole setup, so send
  // every field you want kept.
  await api.playbooks.configure({
    key: "changelog",
    repository: "acme/widget",
    values: { audience: "Developers evaluating the SDK" },
    deliverables: ["article", "x_post", "linkedin_post"],
  });

  // Start a run. Reusing the idempotency key returns the same run, so a
  // retried request never starts a second one.
  const { runId } = await api.playbooks.startRun({
    key: "changelog",
    idempotencyKey: "release-2.4.0",
    instructions: "Lead with the new export API",
  });

  // A run takes a few minutes. Poll until it settles.
  let run = await api.playbooks.getRun({ key: "changelog", runId });
  while (run.status === "queued" || run.status === "running") {
    await new Promise((resolve) => setTimeout(resolve, 30_000));
    run = await api.playbooks.getRun({ key: "changelog", runId });
  }

  console.log("Run finished:", run.status);
  for (const deliverable of run.deliverables) {
    console.log(deliverable.export, deliverable.item, deliverable.status);
  }

  // The drafts are in the publication's library, waiting for approval in the
  // app. Nothing is published until someone approves it.
}

main().catch(console.error);
