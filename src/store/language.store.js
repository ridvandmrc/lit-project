import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

export const languageStore = createStore(
  persist((set) => ({
    lang: 'en', // Default language
    setLanguage: (lang) => set({ lang }),
  })),
  {
    name: 'language-storage',
  }
);

export const useLanguageStore = () => languageStore.getState();
export const updateLanguage = (lang) =>
  languageStore.getState().setLanguage(lang);
