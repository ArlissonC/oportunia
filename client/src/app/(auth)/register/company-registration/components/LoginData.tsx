import Input from "@/components/ui/Input";
import FormRegisterContainer from "../../components/FormRegisterContainer";
import { useFormik } from "formik";
import { CompanyRegistrationFormValues } from "@/app/(auth)/hooks/useCompanyRegistration";

interface LoginDataProps {
  formValidation: ReturnType<typeof useFormik<CompanyRegistrationFormValues>>;
}

const LoginData = ({ formValidation }: LoginDataProps) => {
  const { values, errors, touched, setFieldValue } = formValidation;

  return (
    <FormRegisterContainer label="Dados de login">
      <div className="flex flex-col gap-3">
        <Input
          label="E-mail da empresa"
          mandatory
          placeholder="E-mail"
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
            error={errors.password}
            onChange={(e) => setFieldValue("password", e.target.value)}
          />
          <Input
            label="Confirmar senha"
            mandatory
            placeholder="Confirme a senha"
            type="password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
          />
        </div>
      </div>
    </FormRegisterContainer>
  );
};

export default LoginData;
