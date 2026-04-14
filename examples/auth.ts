import { ParagraphAPI } from "../src";

// Auth sessions don't require an existing API key
const api = new ParagraphAPI();

async function main() {
  // Create a browser-based auth session
  // The user opens the verification URL in their browser to approve access
  const session = await api.auth.createSession({ deviceName: "my-app" });
  console.log("Session ID:", session.sessionId);
  console.log("Open this URL to approve:", session.verificationUrl);
  console.log("Expires at:", session.expiresAt);

  // Poll the session status until the user approves or it expires
  const poll = async (): Promise<string | undefined> => {
    for (let i = 0; i < 60; i++) {
      const status = await api.auth.getSession(session.sessionId);

      if (status.status === "completed" && status.apiKey) {
        console.log("Authenticated! API key:", status.apiKey);
        return status.apiKey;
      }

      if (status.status === "expired") {
        console.log("Session expired");
        return undefined;
      }

      // Wait 2 seconds before polling again
      await new Promise((r) => setTimeout(r, 2000));
    }
    console.log("Polling timed out — session was not approved within 2 minutes");
    return undefined;
  };

  const apiKey = await poll();

  if (apiKey) {
    // Use the returned API key for authenticated requests
    const authedApi = new ParagraphAPI({ apiKey });
    const me = await authedApi.me.get();
    console.log("Logged in as:", me.name);
  } else {
    // Clean up the pending session if the user never approved
    await api.auth.deleteSession(session.sessionId);
    console.log("Session cancelled");
  }
}

main().catch(console.error);
