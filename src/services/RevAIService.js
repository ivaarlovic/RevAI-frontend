import api from "./api";

export const RevAIService = {
  register: async (userData) => {
    // userData: {username, email, passwordHash}

    return await api.post("/User", {
      Username: userData.name,
      Email: userData.email,
      PasswordHash: userData.password,
    });
  },

  login: async (loginData) => {
    // loginData: {email, password}
    return await api.post("/User/login", {
      email: loginData.email,
      password: loginData.password,
    });
  },

  savePreferences: async (data) => {
    return await api.post("/Car/save-preferences", data);
  },
};
