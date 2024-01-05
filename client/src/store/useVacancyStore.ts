import { GetVacanciesResponse, Vacancy } from "@/services/vacancy/types";
import { create } from "zustand";

type ActionsProps = {
  setVacancyStoreState: (state: keyof StoreProps["state"], value: any) => void;
};

type StoreProps = {
  state: {
    vacancies: GetVacanciesResponse[];
  };
  actions: ActionsProps;
};

export const useVacancyStore = create<StoreProps>((set) => ({
  state: {
    vacancies: [],
  },
  actions: {
    setVacancyStoreState: (currentState, value) =>
      set((state) => ({
        state: { ...state.state, [currentState]: value },
      })),
  },
}));
