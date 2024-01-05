import { OptionType } from "@/@types/react-select";
import {
  convertStringToDecimal,
  removeSpecialCharacters,
} from "@/constants/string";
import { authService } from "@/services/auth";
import { RegisterRequest, RegisterResponse } from "@/services/auth/types";
import { candidateService } from "@/services/candidate";
import { ViaCepResponse, viaCep } from "@/services/viaCep";
import { useCandidateStore } from "@/store/useCandidateStore";
import { candidateRegistrationSchema } from "@/validation/yup/auth";
import { format, parse } from "date-fns";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export type CandidateRegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateBirth: string;
  phoneNumber: string;
  salaryExpectation: string;
  jobPosition: string;
  presentation: string;
  cep: string;
  state: string;
  street: string;
  city: string;
  neighborhood: string;
  number: string;
  linkedinUrl: string;
  gitHubUrl: string;
  instagramUrl: string;
  portfolioUrl: string;
  level: OptionType | null;
};

export const useCandidateRegistration = () => {
  const {
    state: {
      professionalExperiences,
      candidatePhotoFile,
      candidateCurriculumFile,
    },
    actions: { setCandidateStoreState },
  } = useCandidateStore();
  const router = useRouter();

  const createCandidateMutation = useMutation<string, Error, FormData>(
    candidateService.createCandidateData,
  );
  const registerCandidateMutation = useMutation<
    RegisterResponse,
    Error,
    RegisterRequest
  >(authService.register);

  const viaCepMutation = useMutation<ViaCepResponse, Error, string>(viaCep);

  const formik = useFormik<CandidateRegistrationFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateBirth: "",
      phoneNumber: "",
      salaryExpectation: "R$ 0,00",
      jobPosition: "",
      presentation: "",
      cep: "",
      state: "",
      street: "",
      city: "",
      neighborhood: "",
      number: "",
      linkedinUrl: "",
      gitHubUrl: "",
      instagramUrl: "",
      portfolioUrl: "",
      level: null,
    },
    validationSchema: candidateRegistrationSchema,
    onSubmit: async (fields) => {
      const birthDate = formattedDateStr(fields.dateBirth);
      await handleRegisterCandidate({
        birthDate,
        email: fields.email,
        name: fields.name,
        password: fields.password,
        phoneNumber: fields.phoneNumber,
        role: 0,
      });
    },
  });

  const formattedDateStr = (date: string) => {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    const formattedDateStr = format(parsedDate, "yyyy-MM-dd");

    return formattedDateStr;
  };

  const handleCreateCandidate = async (params: FormData) => {
    createCandidateMutation.mutate(params, {
      onSuccess: async () => {
        router.push("/login");
      },
    });
  };

  const handleRegisterCandidate = async (params: RegisterRequest) => {
    registerCandidateMutation.mutate(params, {
      onSuccess: async ({ message, id }) => {
        toast.success(message);
        const formData = new FormData();
        formData.append("CandidateId", id);

        const address = {
          cep: removeSpecialCharacters(formik.values.cep),
          state: formik.values.state,
          city: formik.values.city,
          street: formik.values.street,
          neighborhood: formik.values.neighborhood,
          number: formik.values.number,
        };

        const candidateData = {
          jobPosition: formik.values.jobPosition,
          presentation: formik.values.presentation,
          salaryExpectation: convertStringToDecimal(
            formik.values.salaryExpectation,
          ),
          linkedinUrl: formik.values.linkedinUrl,
          instagramUrl: formik.values.instagramUrl,
          gitHubUrl: formik.values.gitHubUrl,
          portfolioUrl: formik.values.portfolioUrl,
          level: formik.values.level?.value,
          photo: candidatePhotoFile || "",
          curriculum: candidateCurriculumFile || "",
        };

        professionalExperiences.forEach((experience, index) => {
          let endDate = "";
          const startDate = formattedDateStr(experience.startDate);
          experience.endDate
            ? (endDate = formattedDateStr(experience.endDate))
            : "";
          if (
            experience.jobPosition &&
            experience.company &&
            experience.startDate &&
            experience.description
          ) {
            formData.append(
              `ProfessionalExperiences[${index}].JobPosition`,
              experience.jobPosition,
            );
            formData.append(
              `ProfessionalExperiences[${index}].Description`,
              experience.description,
            );
            formData.append(
              `ProfessionalExperiences[${index}].Company`,
              experience.company,
            );
            formData.append(
              `ProfessionalExperiences[${index}].StartDate`,
              startDate,
            );
            formData.append(
              `ProfessionalExperiences[${index}].EndDate`,
              endDate || "",
            );
          }
        });

        Object.entries(address).forEach(([key, value]) => {
          formData.append(`Address.${key}`, value);
        });

        Object.entries(candidateData).forEach(([key, value]) => {
          formData.append(`CandidateData.${key}`, value);
        });

        await handleCreateCandidate(formData);
      },
    });
  };

  const addProfessionalExperience = () => {
    setCandidateStoreState("professionalExperiences", [
      ...professionalExperiences,
      {
        id: Math.random().toString(36).substring(2),
      },
    ]);
  };

  const updateProfessionalExperienceFields = (
    id: string,
    field: string,
    value: string,
  ) => {
    const arrCopy = [...professionalExperiences];
    const index = professionalExperiences.findIndex((p) => p.id === id);

    arrCopy[index][field] = value;
    setCandidateStoreState("professionalExperiences", arrCopy);
  };

  const removeProfessionalExperience = (id: string) => {
    const professionalExperiencesFiltered = professionalExperiences.filter(
      (pe) => pe.id !== id,
    );

    setCandidateStoreState(
      "professionalExperiences",
      professionalExperiencesFiltered,
    );
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

  return {
    formik,
    professionalExperiences,
    updateProfessionalExperienceFields,
    removeProfessionalExperience,
    addProfessionalExperience,
  };
};
