import React from "react";

const GallerySkeleton = () => {
  return (
    <div className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative h-20 w-20 cursor-pointer rounded-md bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="aspect-square w-full">
        <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default GallerySkeleton;
