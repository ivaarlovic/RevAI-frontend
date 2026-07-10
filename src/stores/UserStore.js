import { makeAutoObservable } from "mobx";
import { RevAIService } from "../services/RevAIService";

class UserStore {
  user = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(email, password) {
    try {
      const response = await RevAIService.login({ email, password });
      this.user = response.data;
      this.isAuthenticated = true;
      return { success: true };
    } catch (error) {
      console.error("Login error: ", error);
      return { success: false, error: "Neuspjesna prijava." };
    }
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }

  async register(userData) {
    try {
      const response = await RevAIService.register(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Registracija nije uspjela. " };
    }
  }
}

export const userStore = new UserStore();
