const CandidateProfileSkeleton = () => {
  return (
    <section className="text-white">
      <div className="mb-10 h-96 rounded-xl bg-gray-700 skeleton-element"></div>
      <div className="flex flex-col gap-10">
        <div className="my-2">
          <h2 className="font-semibold text-2xl mb-3">Apresentação:</h2>
          <div className="bg-gray-700 w-full h-8 skeleton-element"></div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Contato:</h2>
          <div className="bg-gray-700 w-60 h-6 skeleton-element"></div>
          <div className="bg-gray-700 w-60 h-6 skeleton-element"></div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Informações:</h2>
          <div className="bg-gray-700 w-60 h-6 skeleton-element"></div>
          <div className="bg-gray-700 w-60 h-6 skeleton-element"></div>
          <div className="bg-gray-700 w-60 h-6 skeleton-element"></div>
          <div className="bg-gray-700 w-60 h-6 skeleton-element"></div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-2xl">Experiência Profissional:</h2>
          <div className="h-32 bg-gray-700 rounded-lg skeleton-element"></div>
        </div>
      </div>
    </section>
  );
};

export default CandidateProfileSkeleton;
