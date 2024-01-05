"use client";

import { format } from "date-fns";
import { useProfessionalExperiences } from "../hooks/useProfessionalExperiences";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";

const ProfessionalExperiences = () => {
  const { professionalExperiences, handleDeleteProfessionalExperience } =
    useProfessionalExperiences();

  return (
    <section>
      <div className="flex justify-between flex-col md:flex-row items-center mb-5">
        <h2 className="md:text-2xl font-semibold">
          Experiências profissionais
        </h2>
        <Link
          href="professional-experiences/new-experience"
          className="flex gap-2 items-center mt-5 md:mt-0"
        >
          <FaPlus />
          <span>Cadastrar nova experiência</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {professionalExperiences?.length ? (
          professionalExperiences.map((pe) => {
            const formattedStartDate = format(
              new Date(pe.startDate),
              "dd/MM/yyyy",
            );
            const formattedEndDate = pe.endDate
              ? format(new Date(pe.endDate), "dd/MM/yyyy")
              : "Atual";
            return (
              <div
                key={pe.id}
                className="py-8 px-7 bg-white rounded-lg border-l-4 border-brand-tertiary text-gray-800"
              >
                <div className="flex gap-3 items-center justify-end">
                  <Link href={`professional-experiences/${pe.id}`}>
                    <FaEdit className="cursor-pointer" />
                  </Link>
                  <FaTrash
                    onClick={() => handleDeleteProfessionalExperience(pe.id!)}
                    className="text-red-600 cursor-pointer"
                  />
                </div>
                <ul className="leading-7">
                  <li>
                    <span className="font-semibold">Empresa: </span>{" "}
                    {pe.company}
                  </li>
                  <li>
                    <span className="font-semibold">Cargo: </span>{" "}
                    {pe.jobPosition}
                  </li>
                  <li>
                    <span className="font-semibold">Período: </span>
                    {`${formattedStartDate} - ${formattedEndDate}`}
                  </li>
                  <li>
                    <span className="font-semibold">
                      Descrição das atividades:{" "}
                    </span>
                    {pe.description}
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <p>Sem experiências cadastradas</p>
        )}
      </div>
    </section>
  );
};

export default ProfessionalExperiences;
