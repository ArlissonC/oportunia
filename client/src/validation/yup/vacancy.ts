import * as yup from "yup";

export const createVacancySchema = yup
  .object()
  .shape({
    title: yup.string().required("Título da vaga é obrigatório"),
    description: yup.string().required("Descrição da vaga é obrigatório"),
    type: yup.object().required("Tipo da vaga é obrigatório"),
    area: yup.object().required("Área da vaga é obrigatório"),
    level: yup.object().required("Nível de senioridade da vaga é obrigatório"),
    modality: yup.object().required("Modalidade da vaga é obrigatório"),
  })
  .required();
