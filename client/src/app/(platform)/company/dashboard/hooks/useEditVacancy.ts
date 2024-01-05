import { useEffect } from "react";
import { convertStringToDecimal } from "@/constants/string";
import { createVacancySchema } from "@/validation/yup/vacancy";
import { useFormik } from "formik";
import { VacancyFormValues } from "./useNewVacancy";
import { vacancyService } from "@/services/vacancy";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  DisqualifyCandidateRequest,
  UpdateVacancyRequest,
  VacancyArea,
  VacancyLevel,
  VacancyModality,
  VacancyType,
} from "@/services/vacancy/types";
import { convertCurrency, convertInputCurrency } from "@/constants/currency";
import { toast } from "react-toastify";

export const useEditVacancy = () => {
  const { vacancyId } = useParams();
  const updateVacancyMutation = useMutation<
    string,
    Error,
    UpdateVacancyRequest
  >(vacancyService.updateVacancy);
  const disqualifyCandidateMutation = useMutation<
    string,
    Error,
    DisqualifyCandidateRequest
  >(vacancyService.disqualifyCandidate);

  const queryClient = useQueryClient();
  const router = useRouter();

  const formik = useFormik<VacancyFormValues>({
    initialValues: {
      area: null,
      level: null,
      type: null,
      modality: null,
      location: "",
      salary: "",
      title: "",
      description: "",
      responsibilities: "",
      benefits: "",
      differential: "",
      essential: "",
    },
    validationSchema: createVacancySchema,
    onSubmit: async (fields) => {
      const vacancy = {
        vacancyId: vacancyId as string,
        area: fields.area?.value,
        level: fields.level?.value,
        type: fields.type?.value,
        modality: fields.modality?.value,
        location: fields.location || null,
        salary: convertStringToDecimal(fields.salary!) || null,
        title: fields.title,
        description: fields.description,
        responsibilities: fields.responsibilities || null,
        benefits: fields.benefits || null,
        differential: fields.differential || null,
        essential: fields.essential || null,
      };

      await handleUpdateVacancy(vacancy);
    },
  });

  const handleUpdateVacancy = async (params: UpdateVacancyRequest) => {
    updateVacancyMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("companyVacancies");
        toast.success(message);
        router.push("/company/dashboard");
      },
    });
  };

  const handleDisqualifyCandidate = async (
    params: DisqualifyCandidateRequest,
  ) => {
    disqualifyCandidateMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("vacancyToEdition");
        toast.success(message);
      },
    });
  };

  const { data: vacancyToEdition, isLoading: isLoadingVacancy } = useQuery(
    "vacancyToEdition",
    () => vacancyService.getCompanyVacancyToEddition(vacancyId as string),
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (vacancyToEdition) {
      const { vacancy } = vacancyToEdition;
      formik.setFieldValue("title", vacancy.title);
      formik.setFieldValue("location", vacancy.location);
      formik.setFieldValue("description", vacancy.description);
      formik.setFieldValue("salary", convertCurrency(vacancy.salary!));
      formik.setFieldValue("responsibilities", vacancy.responsibilities);
      formik.setFieldValue("essential", vacancy.essential);
      formik.setFieldValue("differential", vacancy.differential);
      formik.setFieldValue("benefits", vacancy.benefits);
      formik.setFieldValue("type", {
        label: VacancyType[vacancy.type],
        value: vacancy.type,
      });
      formik.setFieldValue("area", {
        label: VacancyArea[vacancy.area],
        value: vacancy.area,
      });
      formik.setFieldValue("modality", {
        label: VacancyModality[vacancy.modality],
        value: vacancy.modality,
      });
      formik.setFieldValue("level", {
        label: VacancyLevel[vacancy.level],
        value: vacancy.level,
      });
    }
  }, [vacancyToEdition]);

  return { formik, vacancyToEdition, handleDisqualifyCandidate };
};
