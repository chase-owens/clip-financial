const authority = import.meta.env.VITE_COGNITO_AUTHORITY;
const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;

export const cognitoConfig = {
  authority,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: import.meta.env.VITE_COGNITO_SCOPE,

  metadata: {
    issuer: authority,
    authorization_endpoint: `${cognitoDomain}/oauth2/authorize`,
    token_endpoint: `${cognitoDomain}/oauth2/token`,
    userinfo_endpoint: `${cognitoDomain}/oauth2/userInfo`,
    end_session_endpoint: `${cognitoDomain}/logout`,
    jwks_uri: `${authority}/.well-known/jwks.json`,
  },
};
