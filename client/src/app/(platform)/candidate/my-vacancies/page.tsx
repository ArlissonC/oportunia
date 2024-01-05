"use client";

import Link from "next/link";
import { useMyVacancies } from "../hooks/useMyVacancies";

const MyVacancies = () => {
  const { candidateApplications, handleWithdrawApplicationVacancyMutation } =
    useMyVacancies();

  return (
    <section>
      <h1 className="text-2xl text-white font-semibold mb-5">Minhas vagas</h1>
      <div className="flex flex-col gap-4">
        {candidateApplications?.map((v) => (
          <div
            key={v.id}
            className="w-full bg-white flex justify-between items-center p-4 rounded-lg border-l-4 border-brand-tertiary flex-col md:flex-row"
          >
            <p className="font-bold">{v.title}</p>
            {v.disqualified ? (
              <p className="text-red-600 font-semibold">
                Você foi desclassificado
              </p>
            ) : (
              <div className="flex items-center gap-1 mt-4 md:mt-0 md:gap-5 font-semibold flex-col md:flex-row">
                <Link href={`/vacancies?currentVacancy=${v.id}`}>Ver vaga</Link>
                <button
                  className="text-red-600"
                  onClick={() => handleWithdrawApplicationVacancyMutation(v.id)}
                >
                  Desistir da vaga
                </button>
              </div>
            )}
          </div>
        ))}
        {candidateApplications?.length === 0 && (
          <p className="text-xl font-semibold text-center text-white">
            Você ainda não se candidatou a vagas!
          </p>
        )}
      </div>
    </section>
  );
};

export default MyVacancies;
