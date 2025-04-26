"use client";

import usePaymentModal from "@/hooks/use-payment-modal";
import React from "react";
import Modal from "./ui/modal";
import { AccountNumber } from "./account-number";

const PaymentModal = () => {
  const paymentModal = usePaymentModal();
  const store = usePaymentModal((state) => state.data);

  if (!store) {
    return null;
  }

  return (
    <Modal isOpen={paymentModal.isOpen} onClose={paymentModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5 text-2xl font-bold">
          {store.name}
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <AccountNumber store={store} />
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
