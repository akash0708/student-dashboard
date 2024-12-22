import { create } from "zustand";

type FilterState = {
  cohort: string;
  class: string;
  setCohort: (cohort: string) => void;
  setClass: (classValue: string) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  cohort: "",
  class: "",
  setCohort: (cohort) => set({ cohort }),
  setClass: (classValue) => set({ class: classValue }),
  resetFilters: () =>
    set({
      cohort: "",
      class: "",
    }),
}));
