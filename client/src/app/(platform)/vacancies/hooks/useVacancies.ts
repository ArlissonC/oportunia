import { vacancyService } from "@/services/vacancy";
import { GetVacanciesResponse } from "@/services/vacancy/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useVacancies = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const vacancyId = searchParams.get("currentVacancy");
  const [currentPage, setCurrentPage] = useState(1);
  const [vacancies, setVacancies] = useState<GetVacanciesResponse[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>("");

  const {
    data: vacanciesResponse,
    isLoading: isLoadingVacancies,
    isFetching: isFetchingVacancies,
    refetch: vacanciesRefetch,
  } = useQuery(
    "vacancies",
    () => vacancyService.getVacancies(currentPage, currentSearch),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const newVacancies = [...vacancies, ...data];
        const uniqueVacancies = Array.from(new Set(newVacancies));
        setVacancies(uniqueVacancies);
      },
    },
  );

  const searchVacancies = async () => {
    await setCurrentPage(1);
    setVacancies([]);
    vacanciesRefetch();
  };

  const loadMoreVacancies = async () => {
    await setCurrentPage(currentPage + 1);
    vacanciesRefetch();
  };

  useEffect(() => {
    const hasVacancies = vacancies.length > 0;

    if ((!vacancyId || currentSearch !== "") && hasVacancies) {
      router.push(`/vacancies?currentVacancy=${vacancies[0].id}`);
    }
  }, [pathname, vacancies]);

  return {
    vacancies,
    currentPage,
    isLoadingVacancies,
    vacancyId,
    isFetchingVacancies,
    vacanciesResponse,
    setCurrentPage,
    searchVacancies,
    setCurrentSearch,
    loadMoreVacancies,
  };
};
