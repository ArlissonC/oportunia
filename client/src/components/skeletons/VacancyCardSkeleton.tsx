const VacancyCardSkeleton = () => {
  const fakeVacancies = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-2">
      {fakeVacancies.map((v) => (
        <div
          key={v}
          className="max-w-full w-96 h-30 py-3 px-4 rounded-xl flex flex-col gap-5 bg-white skeleton-element"
        >
          <div className="flex justify-between items-center text-xs font-medium">
            <div className="h-3 w-20 bg-gray-300 skeleton-element"></div>
            <div className="h-3 w-20 bg-gray-300 skeleton-element"></div>
          </div>
          <div className="h-5 w-48 bg-gray-300 skeleton-element"></div>
          <div className="h-3 w-48 bg-gray-300 skeleton-element"></div>
          <div className="h-5 bg-gray-300 skeleton-element"></div>
        </div>
      ))}
    </div>
  );
};

export default VacancyCardSkeleton;
