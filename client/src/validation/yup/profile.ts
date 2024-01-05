import { isValid } from "date-fns";
import * as yup from "yup";

export const companyProfileSchema = yup
  .object()
  .shape({
    companyName: yup.string().required("Nome da empresa é obrigatório"),
    cnpj: yup
      .string()
      .min(14, "Digite um CNPJ válido")
      .matches(/^[a-zA-Z0-9 ]*$/, "CNPJ não pode conter caracteres especiais")
      .required("CNPJ é obrigatório"),
    linkedinUrl: yup.string().url("Digite uma URL válida").nullable(),
    instagramUrl: yup.string().url("Digite uma URL válida").nullable(),
  })
  .required();

export const addressSchema = yup
  .object()
  .shape({
    cep: yup.string().required("CEP é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    street: yup.string().required("Rua é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    number: yup.string().required("Número é obrigatório"),
  })
  .required();

export const loginDataSchema = yup
  .object()
  .shape({
    currentPassword: yup.string().required("Senha atual é obrigatória"),
    newPassword: yup.string().required("Nova senha é obrigatória"),
  })
  .required();

export const candidateProfileDataSchema = yup
  .object()
  .shape({
    jobPosition: yup.string().required("Cargo é obrigatório"),
    presentation: yup.string().required("Apresentação é obrigatório"),
    level: yup.object().required("Nível de senioridade é obrigatório"),
    linkedinUrl: yup.string().url("Digite uma URL válida").nullable(),
    instagramUrl: yup.string().url("Digite uma URL válida").nullable(),
    portfolioUrl: yup.string().url("Digite uma URL válida").nullable(),
    gitHubUrl: yup.string().url("Digite uma URL válida").nullable(),
    tag: yup.string().required("URL do perfil não pode ser vazia"),
  })
  .required();

export const professionalExperiencesSchema = yup
  .object()
  .shape({
    company: yup.string().required("Empresa é obrigatório"),
    jobPosition: yup.string().required("Cargo é obrigatório"),
    endDate: yup
      .string()
      .nullable()
      .test({
        name: "valid-date",
        message: "Adicione uma data válida",
        test: (value) => {
          if (value) {
            const [day, month, year] = value.split("/");
            const parsedMonth = Number(month) - 1;
            const endDate = new Date(Number(year), parsedMonth, Number(day));

            return isValid(endDate) && parsedMonth === endDate.getMonth();
          }

          return true;
        },
      }),
    startDate: yup
      .string()
      .required("Data de início é obrigatória")
      .test({
        name: "valid-date",
        message: "Adicione uma data válida",
        test: (value) => {
          const [day, month, year] = value.split("/");
          const parsedMonth = Number(month) - 1;
          const birthDate = new Date(Number(year), parsedMonth, Number(day));

          return isValid(birthDate) && parsedMonth === birthDate.getMonth();
        },
      }),
    description: yup.string().required("Descrição é obrigatório"),
  })
  .required();
