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

/**
 * Playbooks resource handler.
 * Access via `api.playbooks`
 *
 * Set up and run Playbooks. A run creates drafts that are only published once
 * someone approves them in the Paragraph app. Requires an API key.
 */
export class PlaybooksResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /** Lists the Playbooks your publication can run. */
  list(): Promise<ListPlaybooks200> {
    return this.api.listPlaybooks();
  }

  /** Retrieves one Playbook with its fields, deliverables, and setup. */
  get({ key }: { key: string }): Promise<GetPlaybook200> {
    return this.api.getPlaybook(key);
  }

  /** Replaces a Playbook's setup. Send every field you want kept. */
  configure({
    key,
    ...body
  }: { key: string } & ConfigurePlaybookBody): Promise<ConfigurePlaybook200> {
    return this.api.configurePlaybook(key, body);
  }

  /** Starts a run. Reusing an `idempotencyKey` returns the same run. */
  startRun({
    key,
    ...body
  }: { key: string } & StartPlaybookRunBody): Promise<StartPlaybookRun200> {
    return this.api.startPlaybookRun(key, body);
  }

  /** Retrieves one run with the deliverables written so far. */
  getRun({
    key,
    runId,
  }: {
    key: string;
    runId: string;
  }): Promise<GetPlaybookRun200> {
    return this.api.getPlaybookRun(key, runId);
  }

  /** Lists recent runs of a Playbook, newest first. */
  listRuns({
    key,
    ...params
  }: { key: string } & ListPlaybookRunsParams): Promise<ListPlaybookRuns200> {
    return this.api.listPlaybookRuns(key, params);
  }
}
