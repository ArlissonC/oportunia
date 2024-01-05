import { companyService } from "@/services/company";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export const useCompanyProfile = () => {
  const { companyTag } = useParams();

  const {
    data: companyProfile,
    isLoading: isLoadingCompanyProfile,
    error,
  } = useQuery(
    "companyProfile",
    () => companyService.getCompanyProfile(companyTag as string),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  return { companyProfile };
};
