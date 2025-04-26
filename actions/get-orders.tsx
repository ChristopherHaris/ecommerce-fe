import { Order } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (userId: string): Promise<Order[]> => {
  const { data } = await axios.get<Order[]>(URL, {
    params: {
      userId,
    },
  });
  return data;
};

export default getOrders;
