const VacancyDescriptionCardSkeleton = () => {
  return (
    <section className="rounded-xl bg-white w-full text-slate-800 h-fit">
      <div className="border-b-2 pb-4">
        <div className="h-10 w-48 bg-gray-300 skeleton-element"></div>
        <div className="mt-2 h-5 w-48 bg-gray-300 skeleton-element"></div>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <div className="h-10 bg-gray-300 skeleton-element"></div>
        <div className="h-10 bg-gray-300 skeleton-element"></div>
        <div className="h-10 bg-gray-300 skeleton-element"></div>
        <div className="h-10 bg-gray-300 skeleton-element"></div>
        <div className="h-10 bg-gray-300 skeleton-element"></div>
        <div className="h-10 bg-gray-300 skeleton-element"></div>
      </div>
    </section>
  );
};

export default VacancyDescriptionCardSkeleton;
