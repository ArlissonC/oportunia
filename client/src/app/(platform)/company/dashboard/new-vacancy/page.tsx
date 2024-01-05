"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import { vacancyTypeOptions } from "@/constants/vacancy";
import { useNewVacancy } from "../hooks/useNewVacancy";
import VacancyForm from "../components/VacancyForm";

const NewVacancy = () => {
  const { formik } = useNewVacancy();

  return (
    <section className="w-full rounded-2.5xl bg-brand-primary py-6 px-8">
      <h1 className="text-xl text-white font-semibold mb-10">Nova vaga</h1>
      <VacancyForm formValidation={formik} />
    </section>
  );
};

export default NewVacancy;
