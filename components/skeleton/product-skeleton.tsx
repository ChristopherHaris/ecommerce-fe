const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white group rounded-xl border p-3 space-y-4 md:space-y-5"
        >
          {/* Image skeleton */}
          <div className="aspect-square rounded-xl bg-gray-200 animate-pulse relative" />

          {/* Product name and category skeleton */}
          <div>
            <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2 animate-pulse" />
          </div>

          {/* Price skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
