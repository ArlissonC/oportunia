"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Link from "next/link";
import React from "react";
import { useProfessionalExperiences } from "../hooks/useProfessionalExperiences";

interface ProfessionalExperienceFormProps {
  label: string;
}

const ProfessionalExperienceForm = ({
  label,
}: ProfessionalExperienceFormProps) => {
  const { formik } = useProfessionalExperiences();
  const { errors, values, touched, setFieldValue, handleSubmit } = formik;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold">{label}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Cargo"
          placeholder="Cargo"
          mandatory
          value={values.jobPosition}
          error={touched.jobPosition && errors.jobPosition}
          onChange={(e) => setFieldValue("jobPosition", e.target.value)}
        />
        <Input
          label="Empresa"
          placeholder="Empresa"
          mandatory
          value={values.company}
          error={touched.company && errors.company}
          onChange={(e) => setFieldValue("company", e.target.value)}
        />
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            label="Data Início"
            placeholder="Data de início"
            mandatory
            mask="99/99/9999"
            value={values.startDate}
            error={touched.startDate && errors.startDate}
            onChange={(e) => setFieldValue("startDate", e.target.value)}
          />
          <Input
            label="Data fim (Vazio se for emprego atual)"
            placeholder="Data de fim"
            mask="99/99/9999"
            value={values.endDate}
            error={touched.endDate && errors.endDate}
            onChange={(e) => setFieldValue("endDate", e.target.value)}
          />
        </div>
        <TextArea
          mandatory
          label="Descrição das atividades"
          placeholder="Descreva suas atividades"
          value={values.description}
          error={touched.description && errors.description}
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <Button type="submit">Salvar</Button>
          <Link href="/candidate/profile/professional-experiences">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalExperienceForm;
