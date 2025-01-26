import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/webhook`;

const updatePaidStatus = async (id: string): Promise<unknown> => {
  const { data } = await axios.get<unknown>(`${URL}/${id}`);
  return data;
};

export default updatePaidStatus;