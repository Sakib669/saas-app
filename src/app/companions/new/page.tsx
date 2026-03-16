import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanionForm from "@/components/CompanionForm";

interface Props {}

const NewCompanion = async ({}: Props) => {
  const {userId} = await auth();
  if(!userId) redirect('/sign-in')
  return (
    <main className="lg:w-1/3 min-md:2/3 items-center justify-center">
      <article className="w-full flex gap-4 flex-col">
        <h1>Companion Builder</h1>

        <CompanionForm/>
      </article>
    </main>
  );
};

export default NewCompanion;
