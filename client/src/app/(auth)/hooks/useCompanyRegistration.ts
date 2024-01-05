import { removeSpecialCharacters } from "@/constants/string";
import { authService } from "@/services/auth";
import { RegisterResponse, RegisterRequest } from "@/services/auth/types";
import { companyService } from "@/services/company";
import { ViaCepResponse, viaCep } from "@/services/viaCep";
import { useCompanyStore } from "@/store/useCompanyStore";
import { companyRegistrationSchema } from "@/validation/yup/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export type CompanyRegistrationFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  cep: string;
  state: string;
  street: string;
  city: string;
  neighborhood: string;
  number: string;
  companyName: string;
  cnpj: string;
  description: string;
  linkedinUrl: string;
  instagramUrl: string;
  phoneNumber: string;
};

export const useCompanyRegistration = () => {
  const {
    state: { companyLogoFile },
  } = useCompanyStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const createCompanyDataMutation = useMutation<string, Error, FormData>(
    companyService.createCompanyData,
  );
  const registerCompanyMutation = useMutation<
    RegisterResponse,
    Error,
    RegisterRequest
  >(authService.register);

  const viaCepMutation = useMutation<ViaCepResponse, Error, string>(viaCep);

  const formik = useFormik<CompanyRegistrationFormValues>({
    initialValues: {
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      cep: "",
      state: "",
      street: "",
      city: "",
      neighborhood: "",
      number: "",
      companyName: "",
      cnpj: "",
      description: "",
      linkedinUrl: "",
      instagramUrl: "",
    },
    validationSchema: companyRegistrationSchema,
    onSubmit: async (fields) => {
      await handleRegisterCompany({
        email: fields.email,
        password: fields.password,
        phoneNumber: fields.phoneNumber,
        name: fields.companyName,
        role: 1,
      });
    },
  });

  const handleCreateCompanyData = async (params: FormData) => {
    createCompanyDataMutation.mutate(params, {
      onSuccess: async (message) => {
        toast.success(message);
        router.push("/login");
      },
    });
  };

  const handleRegisterCompany = async (params: RegisterRequest) => {
    registerCompanyMutation.mutate(params, {
      onSuccess: async ({ message, id }) => {
        router.push("/login");
        const formData = new FormData();
        formData.append("CompanyId", id);
        const address = {
          cep: removeSpecialCharacters(formik.values.cep),
          state: formik.values.state,
          city: formik.values.city,
          street: formik.values.street,
          neighborhood: formik.values.neighborhood,
          number: formik.values.number,
        };

        const companyData = {
          companyName: formik.values.companyName,
          cnpj: removeSpecialCharacters(formik.values.cnpj),
          description: formik.values.description,
          linkedinUrl: formik.values.linkedinUrl,
          instagramUrl: formik.values.instagramUrl,
          logo: companyLogoFile || "",
        };

        Object.entries(address).forEach(([key, value]) => {
          formData.append(`Address.${key}`, value);
        });

        Object.entries(companyData).forEach(([key, value]) => {
          formData.append(`CompanyData.${key}`, value);
        });

        await handleCreateCompanyData(formData);
      },
    });
  };

  useEffect(() => {
    (async () => {
      if (formik.values.cep.length > 8) {
        viaCepMutation.mutate(formik.values.cep, {
          onSuccess: async (data) => {
            if (data.erro === true)
              return toast.warning("Digite um CEP válido");

            formik.setFieldValue("city", data.localidade);
            formik.setFieldValue("neighborhood", data.bairro);
            formik.setFieldValue("state", data.uf);
            formik.setFieldValue("street", data.logradouro);
          },
        });
      }
    })();
  }, [formik.values.cep]);

  useEffect(() => {
    if (formik.submitCount > 0 && !formik.isValid) {
      Object.entries(formik.errors).forEach(([_, value]) => {
        toast.error(value);
      });
    }
  }, [formik.submitCount]);

  return { formik, selectedFile, viaCepMutation, setSelectedFile };
};
