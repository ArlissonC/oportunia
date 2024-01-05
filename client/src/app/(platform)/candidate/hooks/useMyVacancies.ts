import { candidateService } from "@/services/candidate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useMyVacancies = () => {
  const withdrawApplicationVacancyMutation = useMutation<string, Error, string>(
    candidateService.withdrawApplicationVacancy,
  );
  const queryClient = useQueryClient();

  const {
    data: candidateApplications,
    isLoading: isLoadingCandidateApplications,
  } = useQuery(
    "candidateApplications",
    candidateService.getVacanciesCandidate,
    {
      refetchOnWindowFocus: false,
      staleTime: 600000,
    },
  );

  const handleWithdrawApplicationVacancyMutation = async (
    vacancyId: string,
  ) => {
    withdrawApplicationVacancyMutation.mutate(vacancyId, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("candidateApplications");
        queryClient.invalidateQueries("vacancies");
        toast.success(message);
      },
    });
  };

  return { candidateApplications, handleWithdrawApplicationVacancyMutation };
};
