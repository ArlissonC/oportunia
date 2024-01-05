"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { formik, loginMutation } = useLogin();
  const { values, errors, touched, handleSubmit, setFieldValue } = formik;

  return (
    <section className="bg-brand-primary rounded-2.5xl shadow-auth px-10 py-9 mt-6 max-w-full w-[35.75rem] mx-auto">
      <h1 className="text-2xl text-white text-center font-semibold mb-8">
        Login
      </h1>
      {loginMutation.error && (
        <p className="bg-red-100 text-red-600 text-center mb-4 rounded p-2 font-medium">
          {loginMutation.error.message}
        </p>
      )}
      <form className="flex flex-col border-b pb-8" onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          value={values.email}
          error={touched.email && errors.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={values.password}
          error={touched.password && errors.password}
          onChange={(e) => setFieldValue("password", e.target.value)}
        />
        <Link
          href="forgot-password"
          className="text-right mt-1 text-white font-medium mb-5 hover:underline"
        >
          Esqueci minha senha
        </Link>
        {loginMutation.isLoading && (
          <Button type="button" fullWidth>
            Carregando...
          </Button>
        )}
        {!loginMutation.isLoading && (
          <Button type="submit" fullWidth>
            Entrar
          </Button>
        )}
      </form>
      <div className="mt-8 text-white font-semibold text-center">
        <p>Você ainda não possui cadastro?</p>
        <Link href="register" className="hover:underline">
          Cadastre-se
        </Link>
      </div>
    </section>
  );
};

export default Login;
