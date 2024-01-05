import { addYears, isAfter, isValid } from "date-fns";
import * as yup from "yup";

export const companyRegistrationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("E-mail da empresa é obrigatório"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 8 dígitos.",
      )
      .required("Senha é obrigatório"),
    confirmPassword: yup
      .string()
      .required("Confirme sua senha")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
    companyName: yup.string().required("Nome da empresa é obrigatório"),
    cnpj: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/, "CNPJ não pode conter caracteres especiais")
      .required("CNPJ é obrigatório")
      .min(14, "Digite um CNPJ válido"),
    cep: yup.string().required("CEP é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    street: yup.string().required("Rua é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    number: yup.string().required("Número é obrigatório"),
    linkedinUrl: yup.string().url("Digite uma URL válida"),
    instagramUrl: yup.string().url("Digite uma URL válida"),
  })
  .required();

export const candidateRegistrationSchema = yup
  .object()
  .shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("E-mail é obrigatório"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 8 dígitos.",
      )
      .required("Senha é obrigatório"),
    confirmPassword: yup
      .string()
      .required("Confirme sua senha")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
    dateBirth: yup
      .string()
      .typeError("A data de nascimento deve ser uma string válida")
      .required("A data de nascimento é obrigatória")
      .test({
        name: "valid-date",
        message: "Adicione uma data válida",
        test: (value) => {
          const [day, month, year] = value.split("/");
          const parsedMonth = Number(month) - 1;
          const birthDate = new Date(Number(year), parsedMonth, Number(day));

          return isValid(birthDate) && parsedMonth === birthDate.getMonth();
        },
      })
      .test({
        name: "over-18",
        message: "Este serviço destina-se a usuários maiores de 16 anos",
        test: (value) => {
          const [day, month, year] = value.split("/");
          const parsedMonth = Number(month) - 1;
          const birthDate = new Date(Number(year), parsedMonth, Number(day));
          const currentDate = new Date();

          return (
            isValid(birthDate) && isAfter(currentDate, addYears(birthDate, 16))
          );
        },
      }),
    jobPosition: yup.string().required("Cargo é obrigatório"),
    presentation: yup.string().required("Apresentação é obrigatório"),
    cep: yup.string().required("CEP é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    street: yup.string().required("Rua é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    number: yup.string().required("Número é obrigatório"),
    linkedinUrl: yup.string().url("Digite uma URL válida"),
    instagramUrl: yup.string().url("Digite uma URL válida"),
    portfolioUrl: yup.string().url("Digite uma URL válida"),
    gitHubUrl: yup.string().url("Digite uma URL válida"),
  })
  .required();

export const loginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("Digite um e-mail válido"),
    password: yup.string().required("Senha é obrigatório"),
  })
  .required();

export const forgotPasswordSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("Digite um e-mail válido"),
  })
  .required();

export const resetUserPasswordSchema = yup
  .object()
  .shape({
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 8 dígitos.",
      )
      .required("Nova senha é obrigatório"),
  })
  .required();
