import { getParagraphAPI } from "../generated/api";
import type {
  SendCustomEmail200,
  SendCustomEmailBody,
} from "../generated/models";

/**
 * Emails resource handler.
 * Access via `api.emails`
 *
 * Sends custom emails from your publication to a list of recipient addresses.
 * Reuses the newsletter delivery pipeline (per-recipient envelope, mandatory
 * unsubscribe footer, suppression checks). Eligibility is gated by Paragraph
 * and is not user-configurable; ineligible publications receive a 403.
 */
export class EmailsResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Sends a custom email from your publication to a list of recipient
   * addresses. Markdown body, rendered to HTML server-side. Each recipient
   * receives the email individually with a mandatory unsubscribe footer.
   * Requires an API key.
   *
   * **Eligibility:** Publications must be approved by Paragraph before they
   * can send custom emails. Ineligible publications receive a 403.
   *
   * **Per-recipient filtering:**
   * - Malformed addresses and known disposable domains are skipped (`invalid`).
   * - Addresses that previously unsubscribed from this publication are skipped
   *   (`suppressed`).
   * - Skipped recipients are returned in the response; nothing is delivered to
   *   them.
   *
   * **Caps:** Maximum of 10,000 addresses per call.
   *
   * **Async delivery:** A 200 response means recipients were accepted, not
   * delivered. Sends are queued asynchronously.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * // Send a markdown email to a list of recipients
   * const { accepted, skipped } = await api.emails.send({
   *   subject: "Hello from Paragraph",
   *   body: "# Welcome\n\nThanks for reading.",
   *   emails: ["reader@example.com", "another@example.com"],
   * });
   * console.log(`${accepted} queued, ${skipped.length} skipped`);
   * skipped.forEach(s => console.log(`${s.email}: ${s.reason}`));
   *
   * // Dry run — check filtering without sending
   * const preview = await api.emails.send({
   *   subject: "Preview",
   *   body: "Body here",
   *   emails: ["reader@example.com"],
   *   dryRun: true,
   * });
   * ```
   *
   * @param body - The email send request.
   * @param body.subject - Subject line (1–998 characters).
   * @param body.body - Markdown body, rendered to HTML server-side (max 100KB).
   * @param body.emails - Recipient email addresses (max 10,000).
   * @param body.dryRun - If true, run filtering and return the accepted/skipped
   * split without scheduling delivery.
   * @returns A promise resolving to `{ accepted, skipped }`. `accepted` is the
   * number of recipients queued for delivery; `skipped` lists rejected
   * recipients with their reason (`suppressed`, `invalid`, or
   * `scheduling_failed`).
   */
  send(body: SendCustomEmailBody): Promise<SendCustomEmail200> {
    return this.api.sendCustomEmail(body);
  }
}
