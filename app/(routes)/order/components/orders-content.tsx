import getOrders from "@/actions/get-orders";
import OrderItem from "./order-items";
import getOrderItems from "@/actions/get-order-items";
import getProduct from "@/actions/get-product";

interface OrdersContentProps {
  userId: string;
}

const OrdersContent = async ({ userId }: OrdersContentProps) => {
  // Fetch all order data server-side
  const orders = await getOrders(userId);

  // For each order, prefetch its items and products
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await getOrderItems(order.id);
      const itemsWithProduct = await Promise.all(
        items.map(async (item) => {
          const product = await getProduct(item.productId);
          return { ...item, product };
        })
      );
      return { order, items: itemsWithProduct };
    })
  );

  return (
    <>
      {orders.length === 0 ? (
        <p className="text-neutral-500">You have no orders yet.</p>
      ) : (
        <ul>
          {ordersWithItems.map(({ order, items }) => (
            <OrderItem key={order.id} data={order} prefetchedItems={items} />
          ))}
        </ul>
      )}
    </>
  );
};

export default OrdersContent;
