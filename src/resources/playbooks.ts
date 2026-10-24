import { getParagraphAPI } from "../generated/api";
import type {
  ConfigurePlaybook200,
  ConfigurePlaybookBody,
  GetPlaybook200,
  GetPlaybookRun200,
  ListPlaybookRuns200,
  ListPlaybookRunsParams,
  ListPlaybooks200,
  StartPlaybookRun200,
  StartPlaybookRunBody,
} from "../generated/models";
import type { PlaybookIdentifier, PlaybookRunIdentifier } from "../types";

/**
 * Playbooks resource handler.
 * Access via `api.playbooks`
 *
 * A Playbook turns a source into a package of content: an article, social
 * posts, and a video, all drafted together. Your team sets one up in the app
 * and presses Run. These methods let your own code set it up and press Run,
 * for example from a CI job when a release ships.
 *
 * A run creates drafts. Nothing is posted, emailed, or scheduled until someone
 * approves it in the Paragraph app. Everything a run makes lands in the
 * publication's library, readable with `api.content` and `api.posts`.
 */
export class PlaybooksResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Lists the Playbooks your publication can run, with the fields and
   * deliverables each one accepts and how it's currently set up.
   * Requires an API key.
   *
   * Read the fields from here rather than hard-coding them, so your code keeps
   * working as Playbooks change.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const { playbooks } = await api.playbooks.list();
   * const changelog = playbooks.find((p) => p.key === "changelog");
   * console.log(changelog?.fields.map((f) => f.key));
   * ```
   *
   * @returns A promise that resolves to the available Playbooks.
   */
  list(): Promise<ListPlaybooks200> {
    return this.api.listPlaybooks();
  }

  /**
   * Retrieves one Playbook with its fields, deliverables, and setup.
   * Requires an API key.
   *
   * `setup` is null until the Playbook has been set up.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const changelog = await api.playbooks.get({ key: "changelog" });
   * console.log(changelog.setup?.repository);
   * ```
   *
   * @param identifier - An object containing the Playbook `key`.
   * @returns A promise that resolves to the Playbook.
   */
  get({ key }: PlaybookIdentifier): Promise<GetPlaybook200> {
    return this.api.getPlaybook(key);
  }

  /**
   * Sets up a Playbook: its repository, field values, and deliverables.
   * Requires an API key.
   *
   * This replaces the setup rather than merging into it, and it changes what
   * your team sees in the app. Send every field you want kept.
   *
   * `values` is keyed by the field keys from `list()` and is validated the
   * same way the app validates it, so a bad value fails with a 400 that
   * explains itself. `repository` must be a public GitHub repository as
   * `owner/name`; a private one needs a GitHub connection made in the app.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * await api.playbooks.configure({
   *   key: "changelog",
   *   repository: "acme/widget",
   *   values: { audience: "Developers evaluating the SDK" },
   *   deliverables: ["article", "x_post", "linkedin_post"],
   * });
   * ```
   *
   * @param params - The Playbook `key` plus the setup to save.
   * @returns A promise that resolves to the Playbook with its new setup.
   */
  configure({
    key,
    ...body
  }: PlaybookIdentifier &
    ConfigurePlaybookBody): Promise<ConfigurePlaybook200> {
    return this.api.configurePlaybook(key, body);
  }

  /**
   * Starts a run of a Playbook. Requires an API key.
   *
   * A run takes several minutes, so this returns as soon as the work is
   * queued. Poll `getRun()` for progress.
   *
   * `idempotencyKey` is yours to choose. Sending the same one again returns the
   * run you already started instead of starting a second one, so retrying is
   * safe. Use something stable for what you're writing about, like a release
   * tag. `instructions` optionally steers this one run.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const { runId } = await api.playbooks.startRun({
   *   key: "changelog",
   *   idempotencyKey: "release-2.4.0",
   *   instructions: "Lead with the new export API",
   * });
   * ```
   *
   * @param params - The Playbook `key`, an `idempotencyKey`, and optional
   * `instructions`.
   * @returns A promise that resolves to the run id and its status.
   */
  startRun({
    key,
    ...body
  }: PlaybookIdentifier & StartPlaybookRunBody): Promise<StartPlaybookRun200> {
    return this.api.startPlaybookRun(key, body);
  }

  /**
   * Retrieves one run of a Playbook, with the deliverables written so far.
   * Requires an API key.
   *
   * `status` is `queued` or `running` while it works, then `succeeded`,
   * `completed_with_warnings`, `failed`, `blocked`, or `canceled`. Poll every
   * 30 seconds or so; most runs finish in a few minutes.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * let run = await api.playbooks.getRun({ key: "changelog", runId });
   * while (run.status === "queued" || run.status === "running") {
   *   await new Promise((resolve) => setTimeout(resolve, 30_000));
   *   run = await api.playbooks.getRun({ key: "changelog", runId });
   * }
   * ```
   *
   * @param identifier - An object containing the Playbook `key` and `runId`.
   * @returns A promise that resolves to the run.
   */
  getRun({ key, runId }: PlaybookRunIdentifier): Promise<GetPlaybookRun200> {
    return this.api.getPlaybookRun(key, runId);
  }

  /**
   * Lists recent runs of a Playbook, newest first. Requires an API key.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI({ apiKey: "your-api-key" });
   *
   * const { runs } = await api.playbooks.listRuns({ key: "changelog", limit: 5 });
   * ```
   *
   * @param params - The Playbook `key` and an optional `limit`.
   * @returns A promise that resolves to the recent runs.
   */
  listRuns({
    key,
    ...params
  }: PlaybookIdentifier &
    ListPlaybookRunsParams): Promise<ListPlaybookRuns200> {
    return this.api.listPlaybookRuns(key, params);
  }
}
