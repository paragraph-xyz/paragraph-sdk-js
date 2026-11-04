import { getParagraphAPI } from "../generated/api"
import type {
  ConfigureAgent200,
  ConfigureAgentBody,
  GetAgent200,
  GetAgentRun200,
  ListAgentRuns200,
  ListAgentRunsParams,
  ListAgents200,
  StartAgentRun200,
  StartAgentRunBody,
} from "../generated/models"

/**
 * Agents resource handler.
 * Access via `api.agents`
 *
 * Set up and run agents, like the Changelog. A run creates drafts that are
 * only published once someone approves them in the Paragraph app. Requires an
 * API key.
 */
export class AgentsResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /** Lists the agents your publication can run. */
  list(): Promise<ListAgents200> {
    return this.api.listAgents()
  }

  /** Retrieves one agent with its fields, deliverables, and setup. */
  get({ key }: { key: string }): Promise<GetAgent200> {
    return this.api.getAgent(key)
  }

  /** Replaces an agent's setup. Send every field you want kept. */
  configure({
    key,
    ...body
  }: { key: string } & ConfigureAgentBody): Promise<ConfigureAgent200> {
    return this.api.configureAgent(key, body)
  }

  /** Starts a run. Reusing an `idempotencyKey` returns the same run. */
  startRun({
    key,
    ...body
  }: { key: string } & StartAgentRunBody): Promise<StartAgentRun200> {
    return this.api.startAgentRun(key, body)
  }

  /** Retrieves one run with the deliverables written so far. */
  getRun({
    key,
    runId,
  }: {
    key: string
    runId: string
  }): Promise<GetAgentRun200> {
    return this.api.getAgentRun(key, runId)
  }

  /** Lists recent runs of an agent, newest first. */
  listRuns({
    key,
    ...params
  }: { key: string } & ListAgentRunsParams): Promise<ListAgentRuns200> {
    return this.api.listAgentRuns(key, params)
  }
}
