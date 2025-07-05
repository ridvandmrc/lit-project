import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

export const themeStore = createStore(
  persist(
    (set) => ({
      theme: 'light', // light | dark
      toggleTheme: () =>
        set((state) => {
          console.log('Toggling theme from', state.theme);
          document.body.classList.remove(`body-${state.theme}`);
          document.body.classList.add(
            `body-${state.theme === 'light' ? 'dark' : 'light'}`
          );
          return {
            theme: state.theme === 'light' ? 'dark' : 'light',
          };
        }),
      initiateTheme: () =>
        set((state) => {
          document.body.classList.remove(`body-light`, `body-dark`);
          document.body.classList.add(`body-${state.theme}`);
          return { theme: state.theme };
        }),
    }),
    {
      name: 'theme-storage', // Unique name for the storage
    }
  )
);

export const useThemeStore = () => themeStore.getState();
export const toggleTheme = () => themeStore.getState().toggleTheme();
export const initiateTheme = () => themeStore.getState().initiateTheme();
