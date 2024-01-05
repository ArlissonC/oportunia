import { vacancyService } from "@/services/vacancy";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useCompanyVacancies = () => {
  const closeVacancyMutation = useMutation<string, Error, string>(
    vacancyService.closeVacancy,
  );

  const queryClient = useQueryClient();

  const { data: companyVacancies, isLoading: isLoadingCompanyVacancies } =
    useQuery("companyVacancies", vacancyService.getCompanyVacancies, {
      refetchOnWindowFocus: false,
      staleTime: 600000,
    });

  const handleCloseVacancy = async (vacancyId: string) => {
    closeVacancyMutation.mutate(vacancyId, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("companyVacancies");
        toast.success(message);
      },
    });
  };

  return { companyVacancies, isLoadingCompanyVacancies, handleCloseVacancy };
};
