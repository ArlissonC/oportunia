"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import { useCandidateProfileData } from "./hooks/useCandidateProfileData";
import { BiSolidFilePlus } from "react-icons/bi";
import { useCandidateStore } from "@/store/useCandidateStore";
import CustomSelect from "@/components/ui/Select";
import { vacancyLevelOptions } from "@/constants/vacancy";
import { convertInputCurrency } from "@/constants/currency";
import PdfIcon from "@/assets/pdf-icon.svg";
import Image from "next/image";

const CandidateProfile = () => {
  const {
    actions: { setCandidateStoreState },
    state: { candidateCurriculumFile },
  } = useCandidateStore();
  const { formik, candidateProfileData } = useCandidateProfileData();
  const { values, errors, touched, handleSubmit, setFieldValue } = formik;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-5">Informações básicas</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center flex-col md:flex-row">
          <Input
            label="Cargo"
            mandatory
            value={values.jobPosition}
            error={touched.jobPosition && errors.jobPosition}
            onChange={(e) => setFieldValue("jobPosition", e.target.value)}
          />
          <Input
            mask="(99) 99999-9999"
            label="Contato"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
          />
        </div>
        <TextArea
          label="Apresentação"
          mandatory
          value={values.presentation}
          error={touched.presentation && errors.presentation}
          maxLength={14}
          onChange={(e) => setFieldValue("presentation", e.target.value)}
        />
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            label="Pretensão salarial"
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
            label="Nível de senioridade"
            mandatory
            options={vacancyLevelOptions}
            value={values.level}
            onChange={(e) => setFieldValue("level", e)}
          />
        </div>
        <div className="flex justify-between items-center flex-col md:flex-row gap-5 md:gap-0">
          <label
            htmlFor="curriculum-file-input"
            className="flex items-center gap-2 cursor-pointer w-fit"
          >
            <p>Atualizar currículo</p>
            <BiSolidFilePlus className="text-4xl" />
            <p>{candidateCurriculumFile?.name}</p>
          </label>
          {candidateProfileData?.curriculumUrl && (
            <a
              href={candidateProfileData.curriculumUrl}
              target="_blank"
              className="flex gap-2 items-center"
            >
              <Image src={PdfIcon} width={25} height={25} alt="PDF Icon" />
              <p>Clique para acessar currículo atual</p>
            </a>
          )}
        </div>
        <input
          type="file"
          onChange={(e) =>
            setCandidateStoreState(
              "candidateCurriculumFile",
              e.target.files![0],
            )
          }
          accept=".pdf, application/pdf, application/msword"
          id="curriculum-file-input"
          className="hidden"
        />

        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            label="LinkedIn"
            placeholder="URL LinkedIn"
            value={values.linkedinUrl || ""}
            error={touched.linkedinUrl && errors.linkedinUrl}
            onChange={(e) => setFieldValue("linkedinUrl", e.target.value)}
          />
          <Input
            label="Instagram"
            placeholder="URL Instagram"
            value={values.instagramUrl || ""}
            error={touched.instagramUrl && errors.instagramUrl}
            onChange={(e) => setFieldValue("instagramUrl", e.target.value)}
          />
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            label="GitHub"
            placeholder="URL GitHub"
            value={values.gitHubUrl || ""}
            error={touched.gitHubUrl && errors.gitHubUrl}
            onChange={(e) => setFieldValue("gitHubUrl", e.target.value)}
          />
          <Input
            label="Portfólio"
            placeholder="URL Portfólio"
            value={values.portfolioUrl || ""}
            error={touched.portfolioUrl && errors.portfolioUrl}
            onChange={(e) => setFieldValue("portfolioUrl", e.target.value)}
          />
        </div>
        <label className="md:flex flex-col gap-2 hidden">
          <span className="font-medium">Personalize a URL do seu perfil</span>
          <div className="flex gap-1 items-center">
            <span>www.localhost.com/company/</span>
            <input
              type="text"
              className="bg-transparent border-b outline-none"
              value={values.tag}
              maxLength={20}
              onChange={(e) => setFieldValue("tag", e.target.value)}
            />
          </div>
          {errors.tag && (
            <p className="text-red-500 font-medium">{errors.tag}</p>
          )}
        </label>
        <Button type="submit">Salvar</Button>
      </form>
    </section>
  );
};

export default CandidateProfile;
