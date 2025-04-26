import Container from "@/components/ui/container";
import getOrders from "@/actions/get-orders";
import { auth } from "@clerk/nextjs/server";
import OrderItem from "./components/order-items";
import { redirect } from "next/navigation";

const OrderPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const orders = await getOrders(userId);

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">
            Your Orders
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {orders.length === 0 && (
                <p className="text-neutral-500">Your cart is empty.</p>
              )}
              <ul>
                {orders.map((order) => (
                  <OrderItem key={order.id} data={order} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
