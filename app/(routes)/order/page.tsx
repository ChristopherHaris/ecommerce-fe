import Container from "@/components/ui/container";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import OrdersContent from "./components/orders-content";
import OrderItemSkeleton from "./components/order-items-skeleton";

const OrderPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Your Orders</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              <Suspense fallback={<OrderItemSkeleton />}>
                <OrdersContent userId={userId} />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
