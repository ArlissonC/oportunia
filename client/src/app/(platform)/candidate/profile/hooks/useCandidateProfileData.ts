import { OptionType } from "@/@types/react-select";
import { convertCurrency } from "@/constants/currency";
import { convertStringToDecimal } from "@/constants/string";
import { candidateService } from "@/services/candidate";
import { VacancyLevel } from "@/services/vacancy/types";
import { useCandidateStore } from "@/store/useCandidateStore";
import { candidateProfileDataSchema } from "@/validation/yup/profile";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

type CandidateProfileFormValues = {
  id: string;
  jobPosition: string;
  phoneNumber: string;
  presentation: string;
  salaryExpectation: string;
  linkedinUrl: string;
  instagramUrl: string;
  portfolioUrl: string;
  gitHubUrl: string;
  tag: string;
  level: OptionType | null;
};

export const useCandidateProfileData = () => {
  const {
    state: { candidateCurriculumFile },
  } = useCandidateStore();
  const updateCandidateDataMutation = useMutation<string, Error, FormData>(
    candidateService.updateCandidateData,
  );

  const queryClient = useQueryClient();

  const formik = useFormik<CandidateProfileFormValues>({
    initialValues: {
      id: "",
      jobPosition: "",
      presentation: "",
      phoneNumber: "",
      salaryExpectation: "",
      linkedinUrl: "",
      instagramUrl: "",
      portfolioUrl: "",
      gitHubUrl: "",
      tag: "",
      level: null,
    },
    validationSchema: candidateProfileDataSchema,
    onSubmit: async (fields) => {
      const formData = new FormData();

      const candidateData = {
        jobPosition: fields.jobPosition,
        presentation: fields.presentation,
        phoneNumber: fields.phoneNumber,
        salaryExpectation: convertStringToDecimal(fields.salaryExpectation),
        linkedinUrl: fields.linkedinUrl,
        instagramUrl: fields.instagramUrl,
        gitHubUrl: fields.gitHubUrl,
        portfolioUrl: fields.portfolioUrl,
        level: fields.level?.value,
        curriculum: candidateCurriculumFile,
        tag: fields.tag,
      };

      Object.entries(candidateData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await handleUpdateCandidateData(formData);
    },
  });

  const { data: candidateProfileData, isLoading: isLoadingCandidateProfile } =
    useQuery("candidateProfileData", candidateService.getBasicCandidateData, {
      refetchOnWindowFocus: false,
      staleTime: 600000,
    });

  const handleUpdateCandidateData = async (params: FormData) => {
    updateCandidateDataMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("candidateProfileData");
        toast.success(message);
      },
    });
  };

  useEffect(() => {
    if (candidateProfileData) {
      const {
        jobPosition,
        id,
        portfolioUrl,
        salaryExpectation,
        presentation,
        gitHubUrl,
        linkedinUrl,
        instagramUrl,
        tag,
        level,
        phoneNumber,
      } = candidateProfileData;

      formik.setValues({
        jobPosition,
        id,
        phoneNumber,
        portfolioUrl: portfolioUrl || "",
        salaryExpectation: convertCurrency(salaryExpectation!) || "",
        presentation: presentation || "",
        gitHubUrl: gitHubUrl || "",
        linkedinUrl: linkedinUrl || "",
        instagramUrl: instagramUrl || "",
        tag,
        level: { label: VacancyLevel[level], value: level },
      });
    }
  }, [candidateProfileData]);

  return { candidateProfileData, formik };
};
