import Input from "@/components/ui/Input";
import FormRegisterContainer from "../../components/FormRegisterContainer";
import { CandidateRegistrationFormValues } from "@/app/(auth)/hooks/useCandidateRegistration";
import { useFormik } from "formik";

interface CandidateAddressProps {
  formValidation: ReturnType<typeof useFormik<CandidateRegistrationFormValues>>;
}

const CandidateAddress = ({ formValidation }: CandidateAddressProps) => {
  const { errors, values, touched, setFieldValue } = formValidation;

  return (
    <FormRegisterContainer label="Endereço">
      <div className="flex flex-col gap-3">
        <Input
          label="CEP"
          mandatory
          placeholder="Procure pelo CEP"
          mask="99999-999"
          maskChar={null}
          value={values.cep}
          error={touched.cep && errors.cep}
          onChange={(e) => setFieldValue("cep", e.target.value)}
        />
        <div className="flex gap-4">
          <Input
            label="Estado"
            mandatory
            placeholder="Estado"
            value={values.state}
            error={touched.state && errors.state}
            onChange={(e) => setFieldValue("state", e.target.value)}
          />
          <Input
            label="Cidade"
            mandatory
            placeholder="Cidade"
            value={values.city}
            error={touched.city && errors.city}
            onChange={(e) => setFieldValue("city", e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Bairro"
            mandatory
            placeholder="Bairro"
            value={values.neighborhood}
            error={touched.neighborhood && errors.neighborhood}
            onChange={(e) => setFieldValue("neighborhood", e.target.value)}
          />
          <Input
            label="Número"
            mandatory
            placeholder="Número"
            value={values.number}
            error={touched.number && errors.number}
            onChange={(e) => setFieldValue("number", e.target.value)}
          />
        </div>
        <Input
          label="Rua"
          mandatory
          placeholder="Rua"
          value={values.street}
          error={touched.street && errors.street}
          onChange={(e) => setFieldValue("street", e.target.value)}
        />
      </div>
    </FormRegisterContainer>
  );
};

export default CandidateAddress;
