
import { HistoryItem, User } from "../types";

const USER_KEY = 'scholar_user';
const HISTORY_KEY = 'scholar_history';

export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const saveHistoryItem = (item: HistoryItem) => {
  try {
    const history = getHistory();
    // Add to beginning, limit to 50 items initially
    let newHistory = [item, ...history].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (e: any) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.warn("Storage quota exceeded. Attempting to clear old history.");
      // If quota exceeded, try to keep only last 10 items
      try {
         const history = getHistory();
         const reducedHistory = [item, ...history].slice(0, 10);
         localStorage.setItem(HISTORY_KEY, JSON.stringify(reducedHistory));
      } catch (retryError) {
         console.error("Failed to save history even after reduction.", retryError);
         // Last resort: clear all
         // localStorage.removeItem(HISTORY_KEY);
      }
    }
  }
};

export const getHistory = (): HistoryItem[] => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch(e) {
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
