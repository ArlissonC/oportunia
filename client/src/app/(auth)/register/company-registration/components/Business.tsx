import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import React, { ChangeEvent, useState } from "react";
import { BiSolidFilePlus } from "react-icons/bi";
import FormRegisterContainer from "../../components/FormRegisterContainer";
import { useFormik } from "formik";
import { useCompanyStore } from "@/store/useCompanyStore";
import { CompanyRegistrationFormValues } from "@/app/(auth)/hooks/useCompanyRegistration";

interface BusinessProps {
  formValidation: ReturnType<typeof useFormik<CompanyRegistrationFormValues>>;
}

const Business = ({ formValidation }: BusinessProps) => {
  const {
    state: { companyLogoFile },
    actions: { setCompanyStoreState },
  } = useCompanyStore();
  const { values, errors, touched, setFieldValue } = formValidation;

  return (
    <FormRegisterContainer label="Negócios">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <Input
            label="Nome da empresa"
            mandatory
            placeholder="Nome da empresa"
            value={values.companyName}
            error={touched.companyName && errors.companyName}
            onChange={(e) => setFieldValue("companyName", e.target.value)}
          />
          <Input
            label="CNPJ"
            mandatory
            placeholder="CNPJ da empresa"
            maxLength={14}
            value={values.cnpj}
            error={touched.cnpj && errors.cnpj}
            onChange={(e) => setFieldValue("cnpj", e.target.value)}
          />
        </div>
        <Input
          label="Contato"
          placeholder="Número para contato"
          mask="(99) 9 9999-9999"
          value={values.phoneNumber}
          onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
        />
        <TextArea
          label="Descrição"
          placeholder="Escreva uma breve descrição sobre a empresa"
          value={values.description}
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        <label
          htmlFor="file-input"
          className="flex items-center gap-2 cursor-pointer"
        >
          <p>Logo da empresa</p>
          <BiSolidFilePlus className="text-4xl" />
          <p>{companyLogoFile?.name}</p>
        </label>
        <input
          type="file"
          onChange={(e) =>
            setCompanyStoreState("companyLogoFile", e.target.files![0])
          }
          accept="image/jpeg, image/png"
          id="file-input"
          className="hidden"
        />
      </div>
    </FormRegisterContainer>
  );
};

export default Business;
