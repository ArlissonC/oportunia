import { candidateService } from "@/services/candidate";
import { companyService } from "@/services/company";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useProfilePhoto = () => {
  const {
    state: { isCandidate },
  } = useAuthStore();

  const queryClient = useQueryClient();
  const updateCandidateProfilePhotoMutation = useMutation<
    string,
    Error,
    FormData
  >(candidateService.updateCandidateProfilePhoto);
  const updateCompanyProfileLogoMutation = useMutation<string, Error, FormData>(
    companyService.updateCompanyProfileLogo,
  );

  const handleUpdateProfilePhoto = async (photo: File) => {
    const formData = new FormData();
    formData.append("Photo", photo);

    updateCandidateProfilePhotoMutation.mutate(formData, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("candidateProfile");
        toast.success(message);
      },
    });
  };

  const handleUpdateProfileLogo = async (logo: File) => {
    const formData = new FormData();
    formData.append("Logo", logo);

    updateCompanyProfileLogoMutation.mutate(formData, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("companyProfileData");
        toast.success(message);
      },
    });
  };

  return { handleUpdateProfilePhoto, handleUpdateProfileLogo };
};
