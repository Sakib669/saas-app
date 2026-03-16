import { SignIn } from "@clerk/nextjs";


interface Props {
  
}

const SignInPage = ({}: Props) => {
  return (
    <main className="flex justify-center items-center">
      <SignIn/>
    </main>
  );
};

export default SignInPage;