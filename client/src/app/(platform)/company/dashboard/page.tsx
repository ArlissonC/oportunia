"use client";

import Link from "next/link";
import { useCompanyVacancies } from "./hooks/useCompanyVacancies";
import { MdAssignmentAdd } from "react-icons/md";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const Dashboard = () => {
  const { companyVacancies, isLoadingCompanyVacancies, handleCloseVacancy } =
    useCompanyVacancies();

  return (
    <section className="w-full rounded-2.5xl bg-brand-primary py-6 px-8">
      <div className="flex items-center justify-between mb-7 flex-col gap-4 md:flex-row md:gap-0">
        <h1 className="text-xl text-white font-semibold">Minhas vagas</h1>
        <Link
          href="dashboard/new-vacancy"
          className="flex items-center gap-2 text-white"
        >
          <MdAssignmentAdd className="text-2xl" />
          Criar nova vaga
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {companyVacancies?.map((v) => (
          <div
            key={v.id}
            className="w-full bg-white flex justify-between items-center p-4 rounded-lg border-l-4 border-brand-tertiary flex-col md:flex-row"
          >
            <p className="font-bold">{v.title}</p>
            <div className="flex items-center gap-5 flex-col text-center md:flex-row text-sm md:text-base">
              <span className="font-medium text-xs md:text-base mt-2 md:mt-0">
                Publicada em:{" "}
                {format(new Date(v.createdAt), "d 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
              <Link className="font-semibold" href={`dashboard/${v.id}`}>
                Editar vaga
              </Link>
              <button
                className="font-semibold text-red-600"
                onClick={() => handleCloseVacancy(v.id)}
              >
                Fechar vaga
              </button>
            </div>
          </div>
        ))}
      </div>
      {companyVacancies?.length === 0 && (
        <p className="text-white">Sem vagas cadastradas</p>
      )}
    </section>
  );
};

export default Dashboard;
