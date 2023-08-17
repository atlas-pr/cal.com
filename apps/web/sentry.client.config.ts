// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";

import { ATLAS_API, SENTRY_DSN } from "@calcom/lib/constants";

declare global {
  interface Window {
    // Embed Atlas widget
    Atlas?: {
      recording?: {
        getSessionId: () => string | undefined;
      };
      chat?: {
        openWindow: () => void;
      };
      identify: (identity: {
        userId: string | number;
        name?: string | null | undefined;
        email?: string | null | undefined;
        phoneNumber?: string | null | undefined;
        userHash?: string | null | undefined;
        customFields?: Record<string, any>;
        account?: Record<string, any>;
        fields?: {
          title?: string | null | undefined;
          department?: string | null | undefined;
          photo?: string | null | undefined;
          street1?: string | null | undefined;
          street2?: string | null | undefined;
          city?: string | null | undefined;
          country?: string | null | undefined;
          postalCode?: string | null | undefined;
          secondaryEmail?: string | null | undefined;

          // both of these fields are deprecated and has been un-nested, are here only for backwards compatibility
          accountName?: string;
          phone?: string;
        };
      }) => void;
    };
  }
}

Sentry.init({
  dsn: SENTRY_DSN,
});

Sentry.addGlobalEventProcessor((event) => {
  const sessionId = window.Atlas?.recording?.getSessionId();
  console.log("session id:", sessionId);
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
