import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <section className="bg-brand-primary rounded-2.5xl shadow-auth px-10 py-9 mt-6 max-w-full w-[35.75rem] mx-auto">
      <h1 className="text-2xl text-white text-center font-semibold mb-8">
        Cadastro
      </h1>
      <div className="flex flex-col gap-3 border-b pb-8">
        <Link href="register/candidate-registration">
          <Button fullWidth>Candidato</Button>
        </Link>
        <Link href="register/company-registration">
          <Button fullWidth>Empresa</Button>
        </Link>
      </div>
      <div className="mt-8 text-white font-semibold text-center">
        <p>Já possui cadastro?</p>
        <Link href="login" className="hover:underline">
          Login
        </Link>
      </div>
    </section>
  );
};

export default Register;
