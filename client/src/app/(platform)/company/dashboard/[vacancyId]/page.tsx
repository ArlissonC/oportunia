"use client";

import Link from "next/link";
import React from "react";
import { useEditVacancy } from "../hooks/useEditVacancy";
import VacancyForm from "../components/VacancyForm";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const Vacancy = () => {
  const { formik, vacancyToEdition, handleDisqualifyCandidate } =
    useEditVacancy();

  return (
    <section className="w-full rounded-2.5xl bg-brand-primary py-6 px-8">
      <h1 className="text-xl text-white font-semibold mb-5">
        Informações da vaga
      </h1>
      <ul className="text-white text-lg leading-7 mb-10">
        <li>
          <span className="font-semibold">Título:</span>{" "}
          {vacancyToEdition?.vacancy.title}
        </li>
        <li>
          <span className="font-semibold">Data:</span>{" "}
          {vacancyToEdition?.vacancy &&
            format(
              new Date(vacancyToEdition.vacancy.createdAt),
              "d 'de' MMMM 'de' yyyy",
              {
                locale: ptBR,
              },
            )}
        </li>
        <li>
          <span className="font-semibold">Número de candidatos:</span>{" "}
          {vacancyToEdition?.candidates.length}
        </li>
      </ul>
      <h2 className="text-xl text-white font-semibold mb-5">Candidatos</h2>
      <div className="flex flex-col gap-3">
        {vacancyToEdition?.candidates.map((c) => (
          <div
            key={c.id}
            className="w-full bg-white flex justify-between items-center p-4 rounded-lg border-l-4 border-brand-tertiary"
          >
            <p className="font-semibold">{c.name}</p>
            <div className="flex items-center font-semibold gap-6 text-xs md:text-base">
              <Link href={`/candidate/${c.tag}`}>Ver perfil</Link>
              <button
                className="text-red-600"
                onClick={() =>
                  handleDisqualifyCandidate({
                    candidateId: c.id,
                    vacancyId: vacancyToEdition.vacancy.id,
                  })
                }
              >
                Desclassificar
              </button>
            </div>
          </div>
        ))}
        {vacancyToEdition?.candidates.length === 0 && (
          <p className="text-white">Sem candidatos...</p>
        )}
      </div>
      <h2 className="text-xl text-white font-semibold mt-10 mb-5">
        Editar informações da vaga
      </h2>
      <VacancyForm formValidation={formik} />
    </section>
  );
};

export default Vacancy;
