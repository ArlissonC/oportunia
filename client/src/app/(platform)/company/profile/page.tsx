"use client";

import Input from "@/components/ui/Input";
import { useCompanyProfileData } from "./hooks/useCompanyProfileData";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

const Profile = () => {
  const { formik } = useCompanyProfileData();
  const { values, errors, touched, handleSubmit, setFieldValue } = formik;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-5">Informações básicas</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          label="Nome da empresa"
          mandatory
          value={values.companyName}
          error={touched.companyName && errors.companyName}
          onChange={(e) => setFieldValue("companyName", e.target.value)}
        />
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <Input
            label="CNPJ"
            mandatory
            value={values.cnpj}
            error={touched.cnpj && errors.cnpj}
            maxLength={14}
            onChange={(e) => setFieldValue("cnpj", e.target.value)}
          />
          <Input
            label="Contato"
            mask="(99) 99999-9999"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
          />
        </div>
        <TextArea
          label="Descrição"
          placeholder="Escreva uma breve descrição sobre a empresa"
          value={values.description || ""}
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        <label className="flex-col gap-2 hidden md:flex">
          <span className="font-medium">Personalize a URL do seu perfil</span>
          <div className="flex gap-1 items-center">
            <span>www.localhost.com/company/</span>
            <input
              className="bg-transparent border-b outline-none"
              value={values.tag || ""}
              maxLength={20}
              onChange={(e) => setFieldValue("tag", e.target.value)}
            />
          </div>
        </label>
        <Input
          label="LinkedIn"
          placeholder="URL LinkedIn"
          value={values.linkedinUrl || ""}
          error={touched.linkedinUrl && errors.linkedinUrl}
          onChange={(e) => setFieldValue("linkedinUrl", e.target.value)}
        />
        <Input
          label="Instgram"
          placeholder="URL Instagram"
          value={values.instagramUrl || ""}
          error={touched.instagramUrl && errors.instagramUrl}
          onChange={(e) => setFieldValue("instagramUrl", e.target.value)}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </section>
  );
};

export default Profile;
