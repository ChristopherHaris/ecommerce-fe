import React, { Suspense } from "react";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";
import Image from "next/image";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <Suspense key={image.id} fallback={<ThumbnailSkeleton />}>
              <GalleryTab image={image} />
            </Suspense>
          ))}
        </TabList>
      </div>
      <TabPanels className="aspect-square w-full">
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Suspense fallback={<ImageSkeleton />}>
                <Image
                  fill
                  src={image.url}
                  alt="image"
                  className="object-cover object-center"
                />
              </Suspense>
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

// Simple skeleton component for the main image
const ImageSkeleton = () => {
  return (
    <div className="aspect-square h-full w-full bg-gray-200 animate-pulse" />
  );
};

// Skeleton component for the thumbnail images
const ThumbnailSkeleton = () => {
  return (
    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-200 animate-pulse" />
  );
};

export default Gallery;
