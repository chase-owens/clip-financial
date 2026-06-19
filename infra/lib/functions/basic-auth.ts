export const createBasicAuthFunctionCode = (
  username: string,
  password: string,
) => {
  const encodedAuth = Buffer.from(`${username}:${password}`).toString("base64");

  return `
function handler(event) {
  var request = event.request;
  var headers = request.headers;

  var expectedAuth = "Basic ${encodedAuth}";

  if (
    typeof headers.authorization === "undefined" ||
    headers.authorization.value !== expectedAuth
  ) {
    return {
      statusCode: 401,
      statusDescription: "Unauthorized",
      headers: {
        "www-authenticate": {
          value: "Basic realm=\\"Clip Admin\\""
        }
      }
    };
  }

  return request;
}
`;
};
