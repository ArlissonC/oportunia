import { candidateService } from "@/services/candidate";
import { ProfessionalExperience } from "@/services/candidate/types";
import { professionalExperiencesSchema } from "@/validation/yup/profile";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import { convertStringInDateTime } from "@/constants/string";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type ProfessionalExperiencesFormValues = {
  jobPosition: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};

export const useProfessionalExperiences = () => {
  const { experienceId } = useParams();
  const createCandidateProfessionalExperienceMutation = useMutation<
    string,
    Error,
    ProfessionalExperience
  >(candidateService.createCandidateProfessionalExperience);
  const updateCandidateProfessionalExperienceMutation = useMutation<
    string,
    Error,
    ProfessionalExperience
  >(candidateService.updateCandidateProfessionalExperience);
  const deleteProfessionalExperienceMutation = useMutation<
    string,
    Error,
    string
  >(candidateService.deleteCandidateProfessionalExperience);
  const queryClient = useQueryClient();
  const router = useRouter();

  const formik = useFormik<ProfessionalExperiencesFormValues>({
    initialValues: {
      company: "",
      description: "",
      endDate: "",
      startDate: "",
      jobPosition: "",
    },
    validationSchema: professionalExperiencesSchema,
    onSubmit: async (fields) => {
      const professionalExperience = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        company: fields.company,
        startDate: convertStringInDateTime(fields.startDate),
        endDate: convertStringInDateTime(fields.endDate) || null,
        description: fields.description,
        jobPosition: fields.jobPosition,
      };

      if (experienceId)
        return await handleUpdateCandidateProfessionalExperience({
          ...professionalExperience,
          id: experienceId as string,
        });

      await handleCreateCandidateProfessionalExperience(professionalExperience);
    },
  });

  const {
    data: professionalExperiences,
    isLoading: isLoadingProfessionalExperiences,
  } = useQuery(
    "professionalExperiences",
    candidateService.getCandidateProfessionalExperiences,
    {
      refetchOnWindowFocus: false,
      staleTime: 600000,
    },
  );

  const {
    data: professionalExperience,
    isLoading: isLoadingProfessionalExperience,
  } = useQuery(
    "professionalExperience",
    () =>
      experienceId
        ? candidateService.getProfessionalExperienceById(experienceId as string)
        : Promise.resolve(null),
    {
      refetchOnWindowFocus: false,
    },
  );

  const handleCreateCandidateProfessionalExperience = async (
    params: ProfessionalExperience,
  ) => {
    createCandidateProfessionalExperienceMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("professionalExperiences");
        toast.success(message);
        router.push("/candidate/profile/professional-experiences");
      },
    });
  };

  const handleUpdateCandidateProfessionalExperience = async (
    params: ProfessionalExperience,
  ) => {
    updateCandidateProfessionalExperienceMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("professionalExperiences");
        toast.success(message);
        router.push("/candidate/profile/professional-experiences");
      },
    });
  };

  const handleDeleteProfessionalExperience = async (id: string) => {
    deleteProfessionalExperienceMutation.mutate(id, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("professionalExperiences");
        toast.success(message);
      },
    });
  };

  useEffect(() => {
    if (professionalExperience) {
      const { company, description, jobPosition, startDate, endDate } =
        professionalExperience;

      formik.setValues({
        company,
        description,
        endDate:
          endDate !== null ? format(parseISO(endDate!), "dd/MM/yyyy") : "",
        jobPosition,
        startDate: format(parseISO(startDate), "dd/MM/yyyy"),
      });
    }
  }, [professionalExperience]);

  return {
    formik,
    professionalExperiences,
    handleDeleteProfessionalExperience,
  };
};
