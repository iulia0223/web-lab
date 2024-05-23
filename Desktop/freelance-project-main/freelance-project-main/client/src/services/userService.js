const API_URL = import.meta.env.VITE_SERVER_URL;

export const userService = {
  update: async (id, role) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(role),
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  delete: async (id, accessToken) => {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/api/users`);
    const data = await response.json();
    return { status: response.status, data };
  },
};

export default userService;
