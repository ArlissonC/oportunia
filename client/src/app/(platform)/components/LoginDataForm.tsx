"use client";

import { useLoginData } from "@/app/(platform)/hooks/useLoginData";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const LoginDataForm = () => {
  const { formik, loginData } = useLoginData();
  const { values, errors, touched, handleSubmit, setFieldValue } = formik;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Dados de login</h2>
        <Input label="Email" readOnly value={loginData?.email} />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Alterar senha</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            label="Senha atual"
            placeholder="Digite sua senha atual"
            mandatory
            value={values.currentPassword}
            error={touched.currentPassword && errors.currentPassword}
            onChange={(e) => setFieldValue("currentPassword", e.target.value)}
            type="password"
          />
          <Input
            label="Nova senha"
            placeholder="Digite a nova senha"
            mandatory
            value={values.newPassword}
            error={touched.newPassword && errors.newPassword}
            onChange={(e) => setFieldValue("newPassword", e.target.value)}
            type="password"
          />
          <Button type="submit">Alterar senha</Button>
        </form>
      </div>
    </section>
  );
};

export default LoginDataForm;
