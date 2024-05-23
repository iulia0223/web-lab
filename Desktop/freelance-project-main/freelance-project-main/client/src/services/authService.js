const API_URL = import.meta.env.VITE_SERVER_URL;

export const authServices = {
  register: async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  profile: async (accessToken) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      throw new Error(error);
    }
  },
};
