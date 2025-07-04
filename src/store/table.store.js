import { createStore } from 'zustand/vanilla';

export const tableStore = createStore((set) => ({
  view: 'table', // table | category
  updateView: (view) => set({ view }),
}));

export const useTableStore = () => tableStore.getState();
export const updateView = (view) => tableStore.getState().updateView(view);
