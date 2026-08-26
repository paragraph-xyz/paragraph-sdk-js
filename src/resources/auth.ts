import { getParagraphAPI } from "../generated/api";
import type {
  CreateAuthSession201,
  CreateAuthSessionBody,
  GetAuthSession200,
  DeleteAuthSession200,
} from "../generated/models";

/**
 * Auth resource handler.
 * Access via `api.auth`
 */
export class AuthResource {
  constructor(private api: ReturnType<typeof getParagraphAPI>) {}

  /**
   * Creates a new browser-based auth session for CLI or other API clients.
   * The returned verification URL should be opened in the user's browser to complete authentication.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   * const session = await api.auth.createSession({
   *   deviceName: "my-cli",
   *   supportsDeliveryAcknowledgement: true,
   * });
   * console.log("Open this URL to authenticate:", session.verificationUrl);
   * ```
   *
   * @param body - Optional body with a device name.
   * @returns A promise that resolves to the session ID, verification URL, and expiry.
   */
  createSession(body: CreateAuthSessionBody = {}): Promise<CreateAuthSession201> {
    return this.api.createAuthSession(body);
  }

  /**
   * Polls the status of an auth session.
   * Acknowledgement-capable clients can retry delivery briefly after approval.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   * const status = await api.auth.getSession("sessionId");
   * if (status.status === "completed") {
   *   console.log("API key:", status.apiKey);
   * }
   * ```
   *
   * @param sessionId - The session ID returned from `createSession`.
   * @returns A promise that resolves to the session status (pending, completed with apiKey, or expired).
   */
  getSession(sessionId: string): Promise<GetAuthSession200> {
    return this.api.getAuthSession(sessionId);
  }

  /**
   * Cancels a pending session or acknowledges secure credential storage.
   *
   * @example
   * ```ts
   * const api = new ParagraphAPI();
   * await api.auth.deleteSession("sessionId");
   * ```
   *
   * @param sessionId - The session ID to settle.
   * @returns A promise that resolves to `{ success: true }` on success.
   */
  deleteSession(sessionId: string): Promise<DeleteAuthSession200> {
    return this.api.deleteAuthSession(sessionId);
  }
}
