import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// @ts-ignore
export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = "xero-demo.us.auth0.com" //process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = "LnueF8mD4XvFAY3qOveZmtN4bX77OZAP" //process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = "http://localhost:3000" //process.env.REACT_APP_AUTH0_CALLBACK_URL;

  // {
  //   "domain": "xero-demo.us.auth0.com",
  //   "clientId": "LnueF8mD4XvFAY3qOveZmtN4bX77OZAP"
  // }

  // @ts-ignore
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};