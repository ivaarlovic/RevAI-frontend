import { makeAutoObservable, runInAction } from "mobx";
import { RevAIService } from "../services/RevAIService";

const LOCAL_USER_KEY = "revai_user";
const SESSION_USER_KEY = "revai_session_user";

const normalizeUser = (data) => {
  const source = data?.user ?? data;
  if (!source) return null;

  return {
    ...source,
    userId: source.userId ?? source.id ?? source.UserId ?? source.Id,
    username:
      source.username ??
      source.name ??
      source.Username ??
      source.Name ??
      source.email ??
      "Korisnik",
    email: source.email ?? source.Email ?? "",
  };
};

class UserStore {
  user = null;
  isAuthenticated = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.restoreSession();
  }

  restoreSession() {
    try {
      const stored =
        localStorage.getItem(LOCAL_USER_KEY) ||
        sessionStorage.getItem(SESSION_USER_KEY);

      if (stored) {
        this.user = normalizeUser(JSON.parse(stored));
        this.isAuthenticated = Boolean(this.user);
      }
    } catch {
      localStorage.removeItem(LOCAL_USER_KEY);
      sessionStorage.removeItem(SESSION_USER_KEY);
    }
  }

  persistUser(user, remember) {
    localStorage.removeItem(LOCAL_USER_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);

    const storage = remember ? localStorage : sessionStorage;
    const key = remember ? LOCAL_USER_KEY : SESSION_USER_KEY;
    storage.setItem(key, JSON.stringify(user));
  }

  async login(email, password, remember = false) {
    this.isLoading = true;

    try {
      const response = await RevAIService.login({ email, password });
      const user = normalizeUser(response.data);

      if (!user?.userId) {
        throw new Error("Odgovor servera ne sadrži korisnički ID.");
      }

      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
      });
      this.persistUser(user, remember);

      return { success: true, user };
    } catch (error) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.title ||
        error.message;

      return {
        success: false,
        error: serverMessage || "Neuspješna prijava.",
      };
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout() {
    localStorage.removeItem(LOCAL_USER_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
    this.user = null;
    this.isAuthenticated = false;
  }

  async register(userData) {
    this.isLoading = true;

    try {
      await RevAIService.register(userData);
      return { success: true };
    } catch (error) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.title ||
        error.message;

      return {
        success: false,
        error: serverMessage || "Registracija nije uspjela.",
      };
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const userStore = new UserStore();
