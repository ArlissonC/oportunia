"use client";

import Button from "@/components/ui/Button";
import BasicInformations from "./components/BasicInformations";
import ProfessionalInformation from "./components/ProfessionalInformation";
import ProfessionalExperiences from "./components/ProfessionalExperiences";
import FormRegisterContainer from "../components/FormRegisterContainer";
import Input from "@/components/ui/Input";
import CandidateAddress from "./components/CandidateAddress";
import { useCandidateRegistration } from "../../hooks/useCandidateRegistration";

const CandidateRegistration = () => {
  const { formik } = useCandidateRegistration();
  const { errors, values, touched, setFieldValue, handleSubmit } = formik;

  return (
    <section className="text-white">
      <h1 className="text-3xl font-semibold text-center mb-20">
        Registro de candidato
      </h1>
      <form
        className="flex flex-col gap-14 mb-5"
        id="registerCompanyForm"
        onSubmit={formik.handleSubmit}
      >
        <BasicInformations formValidation={formik} />
        <ProfessionalInformation formValidation={formik} />
        <ProfessionalExperiences />
        <CandidateAddress formValidation={formik} />
        <FormRegisterContainer label="Links">
          <Input
            label="LinkedIn"
            placeholder="URL LinkedIn"
            value={values.linkedinUrl}
            error={touched.linkedinUrl && errors.linkedinUrl}
            onChange={(e) => setFieldValue("linkedinUrl", e.target.value)}
          />
          <Input
            label="GitHub"
            placeholder="URL GitHub"
            value={values.gitHubUrl}
            error={touched.gitHubUrl && errors.gitHubUrl}
            onChange={(e) => setFieldValue("gitHubUrl", e.target.value)}
          />
          <Input
            label="Portfólio"
            placeholder="URL Portfólio"
            value={values.portfolioUrl}
            error={touched.portfolioUrl && errors.portfolioUrl}
            onChange={(e) => setFieldValue("portfolioUrl", e.target.value)}
          />
          <Input
            label="Instagram"
            placeholder="URL Instagram"
            value={values.instagramUrl}
            error={touched.instagramUrl && errors.instagramUrl}
            onChange={(e) => setFieldValue("instagramUrl", e.target.value)}
          />
        </FormRegisterContainer>
      </form>
      <Button fullWidth type="submit" form="registerCompanyForm">
        Cadastrar
      </Button>
    </section>
  );
};

export default CandidateRegistration;
