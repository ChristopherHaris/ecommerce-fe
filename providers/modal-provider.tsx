"use client";

import PaymentModal from "@/components/payment-modal";
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

  return (
    <>
      <PreviewModal />
      <PaymentModal />
    </>
  );
};

export default ModalProvider;
