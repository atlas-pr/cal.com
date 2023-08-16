// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";

declare global {
  interface Window {
    Atlas?: {
      recording?: {
        getSessionId: () => string;
      };
    };
  }
}

Sentry.init({
  dsn: "https://196663bf25a23c4a10e1246828e590be@o4504843938955264.ingest.sentry.io/4505714723127296",
});

Sentry.addGlobalEventProcessor((event) => {
  const ATLAS_API = "https://atlas-dev.in.ngrok.io";
  const sessionId = window.Atlas?.recording?.getSessionId();
  if (sessionId) {
    event.tags = {
      ...(event.tags || {}),
      ["atlasSupport.sessionId"]: sessionId,
      ["atlasSupport.sessionUrl"]: sessionId ? `${ATLAS_API}/sessions/` + sessionId : "",
    };
    return event;
  }
  return null;
});
