"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useVacancy } from "../hooks/useVacancy";
import VacancyDescriptionCardSkeleton from "@/components/skeletons/VacancyDescriptionCardSkeleton";
import { useAuthStore } from "@/store/useAuthStore";

const VacancyDescriptionCard = () => {
  const { vacancy, isLoadingVacancy, handleApplyToVacancy } = useVacancy();
  const {
    state: { isUserLogged, isCandidate },
  } = useAuthStore();

  return (
    <section className="rounded-xl border-b-black border-b-4 md:border-b-0 bg-white py-4 px-6 w-full text-slate-800 h-fit sticky top-3 max-h-64 md:max-h-none overflow-y-scroll md:overflow-y-auto">
      {isLoadingVacancy ? (
        <VacancyDescriptionCardSkeleton />
      ) : (
        <>
          <div className="border-b-2 pb-4">
            <h1 className="text-lg md:text-3xl font-semibold">
              {vacancy?.title}
            </h1>
            <span className="font-semibold text-sm md:text-base">
              Empresa:{" "}
            </span>
            <Link
              href={`/company/${vacancy?.companyTag}`}
              className="text-blue-600 font-medium hover:underline text-sm md:text-base"
            >
              {vacancy?.companyName}
            </Link>
          </div>
          <div className="flex flex-col gap-6 mt-10 text-sm md:text-lg">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Descrição</h2>
              <p>{vacancy?.description}</p>
            </div>
            {vacancy?.responsibilities && (
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">
                  Responsabilidades e atribuições
                </h2>
                <p className="text-xs md:text-base">
                  {vacancy?.responsibilities}
                </p>
              </div>
            )}
            {vacancy?.essential && (
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Essencial</h2>
                <p className="text-xs md:text-base">{vacancy?.essential}</p>
              </div>
            )}
            {vacancy?.differential && (
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Diferencial</h2>
                <p className="text-xs md:text-base">{vacancy?.differential}</p>
              </div>
            )}
            {vacancy?.benefits && (
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Benefícios</h2>
                <p className="text-xs md:text-base">{vacancy?.benefits}</p>
              </div>
            )}
            {isCandidate && (
              <>
                {vacancy?.userCreatedOrAppliedVacancy ? (
                  <Button fullWidth disabled>
                    Você já se candidatou a esta vaga
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    onClick={() => handleApplyToVacancy(vacancy!.id)}
                  >
                    Candidatar-se
                  </Button>
                )}
              </>
            )}
            {!isUserLogged && (
              <Button fullWidth disabled>
                Para se candidatar, é necessário estar logado.
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default VacancyDescriptionCard;
