import { USER_DATA } from "~/data/userData";
import type { IUserData } from "~/types";

const LOCAL_USER_DATA_KEY = "schoolean_user_data";

export const saveUserData = (data: IUserData): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_USER_DATA_KEY, JSON.stringify(data));
};

export const getUserData = (): IUserData => {
  if (typeof window === "undefined") return USER_DATA;
  const stored = localStorage.getItem(LOCAL_USER_DATA_KEY);
  return stored ? JSON.parse(stored) : USER_DATA;
};

export const updateUserData = (updates: Partial<IUserData>): IUserData => {
  const current = getUserData();
  const updated = { ...current, ...updates };
  saveUserData(updated);
  return updated;
};
