const BillboardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-gray-200 animate-pulse" />
    </div>
  );
};

export default BillboardSkeleton;