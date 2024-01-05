import { convertCurrency } from "@/constants/currency";
import { companyService } from "@/services/company";
import { UpdateCompanyDataRequest } from "@/services/company/types";
import {
  VacancyType,
  VacancyArea,
  VacancyModality,
  VacancyLevel,
} from "@/services/vacancy/types";
import { companyProfileSchema } from "@/validation/yup/profile";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

type CompanyProfileFormValues = {
  description: string;
  companyName: string;
  cnpj: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  tag: string;
  phoneNumber: string;
};

export const useCompanyProfileData = () => {
  const updateCompanyDataMutation = useMutation<
    string,
    Error,
    UpdateCompanyDataRequest
  >(companyService.updateCompanyData);
  const queryClient = useQueryClient();

  const formik = useFormik<CompanyProfileFormValues>({
    initialValues: {
      description: "",
      companyName: "",
      cnpj: "",
      linkedinUrl: "",
      instagramUrl: "",
      tag: "",
      phoneNumber: "",
    },
    validationSchema: companyProfileSchema,
    onSubmit: async (fields) => {
      const companyData = {
        cnpj: fields.cnpj,
        phoneNumber: fields.phoneNumber,
        companyName: fields.companyName,
        tag: fields.tag,
        description: fields.description || null,
        instagramUrl: fields.instagramUrl || null,
        linkedinUrl: fields.linkedinUrl || null,
      };

      await handleUpdateCompanyProfile(companyData);
    },
  });

  const { data: companyProfile, isLoading: isLoadingCompanyProfile } = useQuery(
    "companyProfileData",
    companyService.getBasicCompanyDataByCompanyId,
    {
      refetchOnWindowFocus: false,
      staleTime: 600000,
    },
  );

  const handleUpdateCompanyProfile = async (
    params: UpdateCompanyDataRequest,
  ) => {
    updateCompanyDataMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("companyProfileData");
        toast.success(message);
      },
    });
  };

  useEffect(() => {
    if (companyProfile) {
      const {
        cnpj,
        companyName,
        description,
        linkedinUrl,
        instagramUrl,
        tag,
        phoneNumber,
      } = companyProfile;
      formik.setFieldValue("companyName", companyName);
      formik.setFieldValue("description", description);
      formik.setFieldValue("cnpj", cnpj);
      formik.setFieldValue("linkedinUrl", linkedinUrl);
      formik.setFieldValue("instagramUrl", instagramUrl);
      formik.setFieldValue("tag", tag);
      formik.setFieldValue("phoneNumber", phoneNumber);
    }
  }, [companyProfile]);

  return { companyProfile, formik };
};
