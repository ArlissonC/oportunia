"use client";

import React from "react";
import useResetUserPassword from "../hooks/useResetUserPassword";
import Input from "@/components/ui/Input";

export default function ResetPassword() {
  const { resetUserPasswordMutation, formik } = useResetUserPassword();

  return (
    <section>
      <h1 className="text-3xl text-neutral-700 font-semibold text-center mb-12">
        Alterar senha
      </h1>
      {resetUserPasswordMutation.error && (
        <p className="bg-red-100 text-red-600 text-center mb-4 rounded p-2 font-medium">
          {resetUserPasswordMutation.error.message}
        </p>
      )}
      <form
        className="flex flex-col gap-1 pb-11 border-b mb-6"
        onSubmit={formik.handleSubmit}
      >
        <Input
          placeholder="Senha"
          alt="Insira sua nova senha"
          type="password"
          label="Nova senha"
          value={formik.values.newPassword}
          onChange={(e) => formik.setFieldValue("newPassword", e.target.value)}
          error={formik.touched.newPassword && formik.errors.newPassword}
        />
        {resetUserPasswordMutation.isLoading && (
          <button
            className="text-center py-4 bg-brand-primary text-white font-semibold rounded-lg my-3"
            type="button"
          >
            Carregando...
          </button>
        )}
        {!resetUserPasswordMutation.isLoading && (
          <button
            className="text-center py-4 bg-brand-primary text-white font-semibold rounded-lg my-3"
            type="submit"
          >
            Salvar
          </button>
        )}
      </form>
    </section>
  );
}
