import { vacancyService } from "@/services/vacancy";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useVacancy = () => {
  const searchParams = useSearchParams();
  const vacancyId = searchParams.get("currentVacancy");
  const applyToVacancyMutation = useMutation<string, Error, string>(
    vacancyService.applyToVacancy,
  );
  const queryClient = useQueryClient();

  const {
    data: vacancy,
    isLoading: isLoadingVacancy,
    refetch,
  } = useQuery(
    "vacancy",
    () =>
      vacancyId
        ? vacancyService.getVacancyById(vacancyId)
        : Promise.resolve(null),
    {
      refetchOnWindowFocus: false,
    },
  );

  const handleApplyToVacancy = async (vacancyId: string) => {
    applyToVacancyMutation.mutate(vacancyId, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("vacancy");
        queryClient.invalidateQueries("candidateApplications");
        toast.success(message);
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [vacancyId]);

  return { vacancy, isLoadingVacancy, handleApplyToVacancy };
};
