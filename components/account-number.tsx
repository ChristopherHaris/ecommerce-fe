import { Copy } from "lucide-react";
import { toast } from "sonner";
import IconButton from "./ui/icon-button";
import { Store } from "@/types";
import Button from "./ui/button";
import usePaymentModal from "@/hooks/use-payment-modal";
import { useCallback } from "react";

interface AccountNumberProps {
  store: Store;
}

const onCopy = (description: string) => {
  navigator.clipboard.writeText(description);
  toast.success("Copied to clipboard");
};

export const AccountNumber = ({ store }: AccountNumberProps) => {
  const paymentModal = usePaymentModal();

  const onDoneCallback = useCallback(() => {
    paymentModal.onDone();
    paymentModal.onClose();
  }, [paymentModal]);

  return (
    <div>
      <div className="flex text-lg font-bold items-center gap-x-2">
        Account Number
        {store.owner && (
          <span className="text-muted-foreground">({store.owner})</span>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-base font-semibold">
          {store.accountNumber}
        </code>
        <IconButton
          onClick={() => onCopy(store.accountNumber)}
          icon={<Copy className="h-4 w-4" />}
        />
      </div>
      <Button
        className="mt-6 w-full"
        onClick={onDoneCallback}
      >
        Done
      </Button>
    </div>
  );
};
