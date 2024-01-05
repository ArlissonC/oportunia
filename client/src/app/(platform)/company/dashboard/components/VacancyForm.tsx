import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import {
  vacancyAreaOptions,
  vacancyLevelOptions,
  vacancyModalityOptions,
  vacancyTypeOptions,
} from "@/constants/vacancy";
import { VacancyFormValues } from "../hooks/useNewVacancy";
import { useFormik } from "formik";
import { convertInputCurrency } from "@/constants/currency";

interface VacancyFormProps {
  formValidation: ReturnType<typeof useFormik<VacancyFormValues>>;
}

const VacancyForm = ({ formValidation }: VacancyFormProps) => {
  const { errors, touched, values, setFieldValue, handleSubmit } =
    formValidation;

  return (
    <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit}>
      <Input
        label="Título"
        mandatory
        placeholder="Título da vaga"
        value={values.title}
        error={touched.title && errors.title}
        onChange={(e) => setFieldValue("title", e.target.value)}
      />
      <TextArea
        label="Descrição"
        placeholder="Descrição da vaga"
        mandatory
        error={touched.description && errors.description}
        value={values.description}
        onChange={(e) => setFieldValue("description", e.target.value)}
      />
      <CustomSelect
        label="Tipo:"
        options={vacancyTypeOptions}
        mandatory
        value={values.type}
        errors={touched.type && errors.type}
        onChange={(e) => setFieldValue("type", e)}
      />
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <CustomSelect
          fullWidth
          label="Área"
          options={vacancyAreaOptions}
          mandatory
          value={values.area}
          errors={touched.area && errors.area}
          onChange={(e) => setFieldValue("area", e)}
        />
        <CustomSelect
          fullWidth
          label="Nível senioridade"
          options={vacancyLevelOptions}
          mandatory
          value={values.level}
          errors={touched.level && errors.level}
          onChange={(e) => setFieldValue("level", e)}
        />
      </div>
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <CustomSelect
          fullWidth
          label="Modalidade"
          options={vacancyModalityOptions}
          mandatory
          value={values.modality}
          errors={touched.modality && errors.modality}
          onChange={(e) => setFieldValue("modality", e)}
        />
        <Input
          label="Salário"
          value={values.salary}
          onChange={(e) =>
            setFieldValue("salary", convertInputCurrency(e.target.value))
          }
        />
      </div>
      {values.modality?.value !== 1 && (
        <Input
          label="Local de atuação"
          mandatory
          value={values.location}
          error={touched.location && errors.location}
          onChange={(e) => setFieldValue("location", e.target.value)}
        />
      )}
      <TextArea
        label="Responsabilidades e atribuições"
        placeholder="Responsabilidades e atribuições"
        value={values.responsibilities || ""}
        onChange={(e) => setFieldValue("responsibilities", e.target.value)}
      />
      <TextArea
        label="Essencial"
        placeholder="Essencial"
        value={values.essential || ""}
        onChange={(e) => setFieldValue("essential", e.target.value)}
      />
      <TextArea
        label="Diferencial"
        placeholder="Diferencial"
        value={values.differential || ""}
        onChange={(e) => setFieldValue("differential", e.target.value)}
      />
      <TextArea
        label="Benefícios"
        placeholder="Benefícios"
        value={values.benefits || ""}
        onChange={(e) => setFieldValue("benefits", e.target.value)}
      />
      <Button type="submit" fullWidth>
        Salvar
      </Button>
    </form>
  );
};

export default VacancyForm;
