"use client";

import PreviewModal from "@/components/preview-modal";
import React from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <PreviewModal/>;
};

export default ModalProvider;
