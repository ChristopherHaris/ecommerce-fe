import { Category } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const { data } = await axios.get<Category>(`${URL}/${id}`);
  return data;
};

export default getCategory;