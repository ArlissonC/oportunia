"use client";

import Input from "@/components/ui/Input";
import { FaUserCircle } from "react-icons/fa";
import { GoUpload } from "react-icons/go";
import Image from "next/image";
import { CandidateRegistrationFormValues } from "@/app/(auth)/hooks/useCandidateRegistration";
import { useFormik } from "formik";
import { useCandidateStore } from "@/store/useCandidateStore";

interface BasicInformationsProps {
  formValidation: ReturnType<typeof useFormik<CandidateRegistrationFormValues>>;
}

const BasicInformations = ({ formValidation }: BasicInformationsProps) => {
  const {
    state: { candidatePhotoFile },
    actions: { setCandidateStoreState },
  } = useCandidateStore();
  const { errors, values, touched, setFieldValue } = formValidation;

  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="file-input"
        className="flex flex-col gap-2 items-center cursor-pointer w-fit self-center"
      >
        {!candidatePhotoFile ? (
          <div className="group w-48 h-48 flex items-center justify-center relative mx-auto hover:border-brand-tertiary hover:border-2 rounded-full mb-10 cursor-pointer">
            <FaUserCircle className="text-[11.25rem] text-brand-primary group-hover:opacity-40 z-10 absolute" />
            <GoUpload className="text-6xl text-brand-tertiary hidden group-hover:block z-20 absolute" />
          </div>
        ) : (
          <div className="group w-[11.25rem] h-[11.25rem] rounded-full bg-brand-primary flex justify-center items-center overflow-hidden relative mx-auto hover:border-brand-tertiary hover:border-2 mb-10 cursor-pointer">
            <Image
              src={URL.createObjectURL(candidatePhotoFile) || ""}
              alt="Foto do candidato"
              height={180}
              width={180}
            />
            <GoUpload className="text-6xl text-brand-tertiary hidden group-hover:block z-20 absolute" />
          </div>
        )}
      </label>
      <input
        onChange={(e) =>
          setCandidateStoreState("candidatePhotoFile", e.target.files![0])
        }
        type="file"
        accept="image/jpeg, image/png"
        id="file-input"
        className="hidden"
      />
      <div className="flex flex-col gap-4">
        <Input
          label="Nome"
          mandatory
          placeholder="Seu nome"
          value={values.name}
          error={touched.name && errors.name}
          onChange={(e) => setFieldValue("name", e.target.value)}
        />
        <Input
          label="E-mail"
          mandatory
          placeholder="Seu e-mail"
          value={values.email}
          error={touched.email && errors.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
        />
        <div className="flex gap-4">
          <Input
            label="Senha"
            mandatory
            placeholder="Senha"
            type="password"
            value={values.password}
            error={touched.password && errors.password}
            onChange={(e) => setFieldValue("password", e.target.value)}
          />
          <Input
            label="Confirmar senha"
            mandatory
            placeholder="Confirme a senha"
            type="password"
            value={values.confirmPassword}
            error={touched.confirmPassword && errors.confirmPassword}
            onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Data de nascimento"
            mandatory
            placeholder="Data de nascimento"
            mask="99/99/9999"
            value={values.dateBirth}
            error={touched.dateBirth && errors.dateBirth}
            onChange={(e) => setFieldValue("dateBirth", e.target.value)}
          />
          <Input
            label="Contato"
            placeholder="Número para contato"
            mask="(99) 9 9999-9999"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformations;
