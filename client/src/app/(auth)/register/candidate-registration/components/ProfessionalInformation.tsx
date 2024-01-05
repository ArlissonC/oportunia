import TextArea from "@/components/ui/TextArea";
import { BiSolidFilePlus } from "react-icons/bi";
import FormRegisterContainer from "../../components/FormRegisterContainer";
import Input from "@/components/ui/Input";
import { ChangeEvent, useState } from "react";
import { CandidateRegistrationFormValues } from "@/app/(auth)/hooks/useCandidateRegistration";
import { useFormik } from "formik";
import { useCandidateStore } from "@/store/useCandidateStore";
import CustomSelect from "@/components/ui/Select";
import { vacancyLevelOptions } from "@/constants/vacancy";
import { convertInputCurrency } from "@/constants/currency";

interface ProfessionalInformationProps {
  formValidation: ReturnType<typeof useFormik<CandidateRegistrationFormValues>>;
}

const ProfessionalInformation = ({
  formValidation,
}: ProfessionalInformationProps) => {
  const {
    state: { candidateCurriculumFile },
    actions: { setCandidateStoreState },
  } = useCandidateStore();
  const { errors, values, touched, setFieldValue } = formValidation;

  return (
    <FormRegisterContainer label="Informações profissionais">
      <Input
        label="Cargo"
        placeholder="Seu cargo profissional"
        mandatory
        value={values.jobPosition}
        error={touched.jobPosition && errors.jobPosition}
        onChange={(e) => setFieldValue("jobPosition", e.target.value)}
      />
      <TextArea
        label="Apresentação"
        mandatory
        placeholder="Faça uma breve apresentação sobre você"
        value={values.presentation}
        error={touched.presentation && errors.presentation}
        onChange={(e) => setFieldValue("presentation", e.target.value)}
      />
      <div className="flex gap-4">
        <Input
          label="Pretensão salarial"
          placeholder="Sua pretensão salarial"
          value={values.salaryExpectation}
          error={touched.salaryExpectation && errors.salaryExpectation}
          onChange={(e) =>
            setFieldValue(
              "salaryExpectation",
              convertInputCurrency(e.target.value),
            )
          }
        />
        <CustomSelect
          fullWidth
          label="Seu nível de senioridade"
          mandatory
          options={vacancyLevelOptions}
          onChange={(e) => setFieldValue("level", e)}
        />
      </div>
      <label
        htmlFor="curriculum-file-input"
        className="flex items-center gap-2 cursor-pointer"
      >
        <p>Currículo</p>
        <BiSolidFilePlus className="text-4xl" />
        <p>{candidateCurriculumFile?.name}</p>
      </label>
      <input
        type="file"
        onChange={(e) =>
          setCandidateStoreState("candidateCurriculumFile", e.target.files![0])
        }
        accept=".pdf, application/pdf, application/msword"
        id="curriculum-file-input"
        className="hidden"
      />
    </FormRegisterContainer>
  );
};

export default ProfessionalInformation;
