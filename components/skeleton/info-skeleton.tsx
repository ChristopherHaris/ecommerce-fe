import React from "react";

const InfoSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Product name skeleton */}
      <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />

      {/* Price skeleton */}
      <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse" />

      {/* Description skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Size/color selection skeleton */}
      <div className="space-y-4">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Add to cart button skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
    </div>
  );
};

export default InfoSkeleton;
