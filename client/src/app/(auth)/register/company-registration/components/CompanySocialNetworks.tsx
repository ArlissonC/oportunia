import Input from "@/components/ui/Input";
import FormRegisterContainer from "../../components/FormRegisterContainer";
import { useFormik } from "formik";
import { CompanyRegistrationFormValues } from "@/app/(auth)/hooks/useCompanyRegistration";

interface CompanySocialNetworksProps {
  formValidation: ReturnType<typeof useFormik<CompanyRegistrationFormValues>>;
}

const CompanySocialNetworks = ({
  formValidation,
}: CompanySocialNetworksProps) => {
  const { values, errors, touched, setFieldValue } = formValidation;

  return (
    <FormRegisterContainer label="Redes Sociais">
      <div className="flex flex-col gap-3">
        <Input
          label="LinkedIn"
          placeholder="URL LinkedIn"
          value={values.linkedinUrl}
          error={touched.linkedinUrl && errors.linkedinUrl}
          onChange={(e) => setFieldValue("linkedinUrl", e.target.value)}
        />
        <Input
          label="Instagram"
          placeholder="URL Instagram"
          value={values.instagramUrl}
          error={touched.instagramUrl && errors.instagramUrl}
          onChange={(e) => setFieldValue("instagramUrl", e.target.value)}
        />
      </div>
    </FormRegisterContainer>
  );
};

export default CompanySocialNetworks;
