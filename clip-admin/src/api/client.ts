const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createApiClient = (accessToken?: string) => ({
  get: async (path: string) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  },

  patch: async (path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    return response.json();
  },

  put: async (path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    return response.json();
  },
});
