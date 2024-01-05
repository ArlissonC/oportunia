import { create } from "zustand";

type ActionsProps = {
  setCompanyStoreState: (state: keyof StoreProps["state"], value: any) => void;
};

type StoreProps = {
  state: {
    companyLogoFile: File | null;
  };
  actions: ActionsProps;
};

export const useCompanyStore = create<StoreProps>((set) => ({
  state: {
    companyLogoFile: null,
  },
  actions: {
    setCompanyStoreState: (currentState, value) =>
      set((state) => ({
        state: { ...state.state, [currentState]: value },
      })),
  },
}));
