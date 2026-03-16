import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { SignInButton, Show, UserButton, SignUpButton } from "@clerk/nextjs";

interface Props {}

const Navbar = ({}: Props) => {
  return (
    <nav className="navbar">
      <Link href={"/"}>
        <div className="flex items-center gap-2 5 cursor-pointer">
          <Image src={"/images/logo.svg"} alt="log" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <Show when="signed-out">
          <div className="flex items-center gap-2">
            <SignInButton>
              <button className="btn-signin">Sign In</button>
            </SignInButton>
            <SignUpButton>
              <button className="btn-signin">Sign In</button>
            </SignUpButton>
          </div>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </Show>
      </div>
    </nav>
  );
};

export default Navbar;
