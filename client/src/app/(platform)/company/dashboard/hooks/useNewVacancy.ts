import { OptionType } from "@/@types/react-select";
import { convertInputCurrency } from "@/constants/currency";
import { convertStringToDecimal } from "@/constants/string";
import { vacancyService } from "@/services/vacancy";
import { CreateVacancyRequest } from "@/services/vacancy/types";
import { createVacancySchema } from "@/validation/yup/vacancy";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export type VacancyFormValues = {
  area: OptionType | null;
  level: OptionType | null;
  type: OptionType | null;
  modality: OptionType | null;
  location?: string;
  salary?: string;
  title: string;
  description: string;
  responsibilities?: string;
  essential?: string;
  differential?: string;
  benefits?: string;
};

export const useNewVacancy = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createVacancyMutation = useMutation<
    string,
    Error,
    CreateVacancyRequest
  >(vacancyService.createVacancy);

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

      await handleCreateVacancy(vacancy);
    },
  });

  const handleCreateVacancy = async (params: CreateVacancyRequest) => {
    createVacancyMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("companyVacancies");
        toast.success(message);
        router.push("/company/dashboard");
      },
    });
  };

  return { formik };
};
