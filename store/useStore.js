import create from "zustand";

export const useStore = create((set) => ({
  selectedYear: {},
  setSelectedYear: (value) => set((state) => ({ selectedYear: value })),
}));
