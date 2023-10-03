import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/useApi";
//models
export interface User {
  username: string;
  userType: String;
}

export interface State {
  user: User;
  username: string,
  accessToken: string;
  authReady: boolean;
  userType: string
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
}
//states

export const useAuthStore = defineStore("auth", {
  state: (): State => {
    return {
      user: {} as User,
      username: '' as string,
      accessToken: "" as string,
      authReady: false as boolean,
      userType: "" as string
    };
  },
  getters: {
    isAuthenticated: (state: State) => (state.accessToken ? true : false),
  },
  actions: {
    async attempt() {
      try {
        await this.refresh();
        await this.getUser();
      } catch (error) {
        return;
      }
      return;
    },
    async register(payload: RegisterData) {
      try {
        const { data } = await useApi().post("/api/v1/register", payload);
        return data;
      } catch (error: Error | any) {
        throw error.message;
      }
    },
    async login(payload: LoginData) {
      try {
        const { data } = await useApi().post("/api/v1/login", payload);
        this.accessToken = data.access_token;
        this.username = data.user
        this.userType = data.userType
      } catch (error) {}
    },
    async refresh() {
      try {
        const { data } = await useApi().post("/api/v1/refresh");
        this.accessToken = data.access_token;
        return data;
      } catch (error: Error | any) {
        throw error.message;
      }
    },
    async getUser() {
      try {
        const { data } = await useApiPrivate().get("/api/v1/user");
        this.user = data;
        this.userType = data.userType
        return data;
      } catch (error: Error | any) {
        throw error.message;
      }
    },
    async logout() {
      try {
        const { data } = await useApiPrivate().post("/api/v1/logout");
        this.accessToken = "";
        this.user = {} as User;
        return data;
      } catch (error: Error | any) {
        throw error.response.message;
      }
    },
  },
});
