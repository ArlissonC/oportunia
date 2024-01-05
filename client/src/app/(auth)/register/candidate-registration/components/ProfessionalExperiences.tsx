"use client";

import { useCandidateRegistration } from "@/app/(auth)/hooks/useCandidateRegistration";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";

const ProfessionalExperiences = () => {
  const {
    removeProfessionalExperience,
    updateProfessionalExperienceFields,
    addProfessionalExperience,
    professionalExperiences,
  } = useCandidateRegistration();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Experiência profissional</h2>
        <button
          type="button"
          onClick={addProfessionalExperience}
          className="flex gap-3 items-center"
        >
          <span>Adicionar</span>
          <IoMdAddCircle className="text-xl" />
        </button>
      </div>
      <div className="flex flex-col gap-10">
        {professionalExperiences.map((pe) => (
          <div key={pe.id} className="flex flex-col gap-2">
            <FaTrashCan
              className="self-end text-xl text-red-500"
              onClick={() => removeProfessionalExperience(pe.id)}
            />
            <div className="flex flex-col gap-4">
              <Input
                label="Cargo"
                placeholder="Cargo"
                onChange={(e) =>
                  updateProfessionalExperienceFields(
                    pe.id,
                    "jobPosition",
                    e.target.value,
                  )
                }
              />
              <Input
                label="Empresa"
                placeholder="Empresa"
                onChange={(e) =>
                  updateProfessionalExperienceFields(
                    pe.id,
                    "company",
                    e.target.value,
                  )
                }
              />
              <div className="flex gap-4">
                <Input
                  label="Data Início"
                  placeholder="Data de início"
                  mask="99/99/9999"
                  onChange={(e) =>
                    updateProfessionalExperienceFields(
                      pe.id,
                      "startDate",
                      e.target.value,
                    )
                  }
                />
                <Input
                  label="Data fim (Vazio se for emprego atual)"
                  placeholder="Data de fim"
                  mask="99/99/9999"
                  onChange={(e) =>
                    updateProfessionalExperienceFields(
                      pe.id,
                      "endDate",
                      e.target.value,
                    )
                  }
                />
              </div>
              <TextArea
                label="Descrição das atividades"
                placeholder="Descreva suas atividades"
                onChange={(e) =>
                  updateProfessionalExperienceFields(
                    pe.id,
                    "description",
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalExperiences;
