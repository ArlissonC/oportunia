import { ProfessionalExperience } from "@/services/candidate/types";
import { create } from "zustand";

type ActionsProps = {
  setCandidateStoreState: (
    state: keyof StoreProps["state"],
    value: any,
  ) => void;
};

type StoreProps = {
  state: {
    candidatePhotoFile: File | null;
    candidateCurriculumFile: File | null;
    professionalExperiences: ProfessionalExperience[];
  };
  actions: ActionsProps;
};

export const useCandidateStore = create<StoreProps>((set) => ({
  state: {
    candidatePhotoFile: null,
    candidateCurriculumFile: null,
    professionalExperiences: [],
  },
  actions: {
    setCandidateStoreState: (currentState, value) =>
      set((state) => ({
        state: { ...state.state, [currentState]: value },
      })),
  },
}));
