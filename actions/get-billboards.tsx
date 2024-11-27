import { Billboard } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboards = async (id: string): Promise<Billboard> => {
  const { data } = await axios.get<Billboard>(`${URL}/${id}`);
  return data;
};

export default getBillboards;