"use client";

import { Auth0Provider } from "@auth0/auth0-react";

// Due to the React Auth0 SDK being strictly client side, we should try to authenticate as little as required, to reduce client side rendering.
export function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: `${typeof window !== "undefined" ? window.location.origin : ""}/applications`,
      }}
    >
      {children}
    </Auth0Provider>
  );
}


