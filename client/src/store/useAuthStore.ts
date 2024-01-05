import { create } from "zustand";

type ActionsProps = {
  setAuthStore: (state: keyof StoreProps["state"], value: any) => void;
};

type StoreProps = {
  state: {
    isCandidate: boolean;
    isUserLogged: boolean;
  };
  actions: ActionsProps;
};

export const useAuthStore = create<StoreProps>((set) => ({
  state: {
    isCandidate: false,
    isUserLogged: false,
  },
  actions: {
    setAuthStore: (currentState, value) =>
      set((state) => ({
        state: { ...state.state, [currentState]: value },
      })),
  },
}));
