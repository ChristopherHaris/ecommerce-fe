const FiltersSkeleton = () => {
  // Create two filter groups (size and color)
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="mb-8">
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="flex items-center gap-x-2">
                <div className="h-5 w-5 rounded-md border bg-gray-200 animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FiltersSkeleton;
