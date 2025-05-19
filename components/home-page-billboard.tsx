import getBillboards from "@/actions/get-billboards";
import Billboard from "@/components/billboard";

const HomePageBillboard = async () => {
  const billboards = await getBillboards(
    "25a66c77-a5d4-4123-8964-83bc56841f07"
  );
  return <Billboard data={billboards} />;
};

export default HomePageBillboard;
