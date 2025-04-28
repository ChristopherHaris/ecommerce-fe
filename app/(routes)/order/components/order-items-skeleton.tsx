"use client";

const OrderItemSkeleton = () => {
  // Create 3 skeleton items to display while loading
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <li key={index} className="flex py-6 border-b">
          {/* Image skeleton */}
          <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-48 sm:w-48 bg-gray-200 animate-pulse" />

          {/* Content skeleton */}
          <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div className="flex justify-between">
                {/* Product name skeleton */}
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
              </div>

              <div className="mt-1 flex text-sm">
                {/* Color and size skeleton */}
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="ml-4 border-l border-gray-200 pl-4 w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Price skeleton */}
              <div className="mt-1">
                <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Subtotal skeleton */}
            <div className="mt-2">
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Status and quantity skeleton */}
          <div className="flex flex-col flex-1 items-end justify-between text-sm">
            <div className="flex flex-col items-end gap-0.5">
              {/* Status skeleton */}
              <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
              {/* Pre-order status skeleton */}
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Quantity skeleton */}
            <div className="w-10 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          <div></div>
        </li>
      ))}
    </>
  );
};

export default OrderItemSkeleton;
