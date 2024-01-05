"use client";

import VacancyCard from "./components/VacancyCard";
import VacancyDescriptionCard from "./components/VacancyDescriptionCard";
import { useVacancies } from "./hooks/useVacancies";
import VacancyCardSkeleton from "@/components/skeletons/VacancyCardSkeleton";

const Vacancices = () => {
  const {
    vacancies,
    isLoadingVacancies,
    isFetchingVacancies,
    vacanciesResponse,
    searchVacancies,
    setCurrentSearch,
    loadMoreVacancies,
  } = useVacancies();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3 relative">
        <input
          placeholder="Cargos, palavras-chaves ou empresa"
          className="w-full px-4 py-5 rounded-lg placeholder:text-xs md:placeholder:text-base"
          onChange={(e) => setCurrentSearch(e.target.value)}
        />
        <button
          className="absolute right-3 bg-brand-tertiary py-3 rounded-lg text-white font-semibold px-4 text-sm md:text-base"
          onClick={() => searchVacancies()}
        >
          Buscar vagas
        </button>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="flex flex-col gap-3">
          {isLoadingVacancies ? (
            <VacancyCardSkeleton />
          ) : (
            <div className="flex flex-col gap-3">
              {vacancies?.map((v) => (
                <VacancyCard key={v.id} vacancy={v} />
              ))}
            </div>
          )}
          <div className="text-white font-medium text-center">
            {!isFetchingVacancies &&
              !isLoadingVacancies &&
              vacanciesResponse?.length !== 0 && (
                <button type="button" onClick={() => loadMoreVacancies()}>
                  Carregar mais vagas
                </button>
              )}
            {isFetchingVacancies && !isLoadingVacancies && (
              <p>Carregando vagas...</p>
            )}
            {vacanciesResponse?.length === 0 && !isFetchingVacancies && (
              <p>Não há mais vagas para exibir</p>
            )}
          </div>
        </div>

        {(vacancies?.length !== 0 || isFetchingVacancies) && (
          <VacancyDescriptionCard />
        )}
      </div>
    </section>
  );
};

export default Vacancices;
