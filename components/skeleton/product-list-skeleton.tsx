// app/components/product-list-skeleton.tsx
import React from "react";

interface ProductListSkeletonProps {
  title: string;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({ title }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Create 4 skeleton product cards */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border p-3 space-y-4 md:space-y-5"
          >
            {/* Image skeleton */}
            <div className="aspect-square rounded-xl bg-gray-200 animate-pulse relative"></div>

            {/* Product name skeleton */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
            </div>

            {/* Price skeleton */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;
