import { Store } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getStore = async (): Promise<Store> => {
  const { data } = await axios.get<Store>(URL);
  return data;
};

export default getStore;