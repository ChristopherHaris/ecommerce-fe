import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col">
      <p className="mb-2 text-gray-500">*gunakan email UBM</p>
      <SignUp />
    </div>
  );
}
