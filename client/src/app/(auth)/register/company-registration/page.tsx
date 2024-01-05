"use client";

import LoginData from "./components/LoginData";
import Business from "./components/Business";
import Button from "@/components/ui/Button";
import CompanyAddress from "./components/CompanyAddress";
import CompanySocialNetworks from "./components/CompanySocialNetworks";
import { useCompanyRegistration } from "../../hooks/useCompanyRegistration";

const CompanyRegistration = () => {
  const { formik, viaCepMutation } = useCompanyRegistration();

  return (
    <section className="text-white">
      <h1 className="text-3xl font-semibold text-center mb-20">
        Registro de empresa
      </h1>
      <form
        className="flex flex-col gap-14 mb-5"
        id="registerCompanyForm"
        onSubmit={formik.handleSubmit}
      >
        <LoginData formValidation={formik} />
        <Business formValidation={formik} />
        <CompanyAddress
          formValidation={formik}
          viaCepMutation={viaCepMutation}
        />
        <CompanySocialNetworks formValidation={formik} />
      </form>
      <Button fullWidth type="submit" form="registerCompanyForm">
        Cadastrar empresa
      </Button>
    </section>
  );
};

export default CompanyRegistration;
