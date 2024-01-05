"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";
import React from "react";
import useForgotPassword from "../hooks/useForgotPassword";
import Button from "@/components/ui/Button";

const ForgotPassword = () => {
  const { formik, forgotPasswordMutation } = useForgotPassword();

  return (
    <section>
      <h1 className="text-3xl text-white font-semibold text-center mb-12">
        Esqueci minha senha
      </h1>
      {forgotPasswordMutation.error && (
        <p className="bg-red-100 text-red-600 text-center mb-4 rounded p-2 font-medium">
          {forgotPasswordMutation.error.message}
        </p>
      )}
      {forgotPasswordMutation.data && (
        <p className="bg-green-100 text-green-600 text-center mb-4 rounded p-2 font-medium">
          {forgotPasswordMutation.data.message}
        </p>
      )}
      <form
        className="flex flex-col gap-1 pb-11 border-b mb-6"
        onSubmit={formik.handleSubmit}
      >
        <Input
          placeholder="E-mail para resetar senha"
          alt="Insira seu endereço de email"
          value={formik.values.email}
          onChange={(e) => formik.setFieldValue("email", e.target.value)}
          error={formik.touched.email && formik.errors.email}
        />
        {forgotPasswordMutation.isLoading && (
          <Button fullWidth type="submit">
            Carregando...
          </Button>
        )}
        {!forgotPasswordMutation.isLoading && (
          <Button fullWidth type="submit">
            Resetar
          </Button>
        )}
      </form>
      <div className="text-center font-semibold text-sm">
        <p className="text-white mb-1">Recuperou sua senha?</p>
        <Link href="/login" className="text-white">
          Entrar
        </Link>
      </div>
    </section>
  );
};

export default ForgotPassword;
