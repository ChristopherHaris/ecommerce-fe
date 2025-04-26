import { OrderItem } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/order-items`;

const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const { data } = await axios.get<OrderItem[]>(URL, {
    params: {
      orderId,
    },
  });
  return data;
};

export default getOrderItems;
