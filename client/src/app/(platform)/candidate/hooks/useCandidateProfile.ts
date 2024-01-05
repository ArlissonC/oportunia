import { candidateService } from "@/services/candidate";
import { GetCandidateProfileResponse } from "@/services/candidate/types";
import { useParams } from "next/navigation";
import { UseQueryResult, useQuery } from "react-query";

export const useCandidateProfile = () => {
  const { candidateTag } = useParams();

  const {
    data: candidateProfile,
    isLoading: isLoadingCandidateProfile,
    error,
  } = useQuery(
    "candidateProfile",
    () => candidateService.getCandidateProfile(candidateTag as string),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  return { candidateProfile, isLoadingCandidateProfile, error };
};
