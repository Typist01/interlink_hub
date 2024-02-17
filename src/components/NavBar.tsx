import { FC } from "react";
import Button from "./common/Button/Button";
import Link from "next/link";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  return (
    <div className="bg-teal-100 text-gray-900 p-8 px-[7vh] 2xl:px-[5vh] flex justify-between items-center">
      <Link href="/" className="text-4xl font-bold text-gray-800 text-center">
        Interlink Hub
      </Link>

      <div className="space-x-2">
        <Button type="link" href="/signup">
          <span className="font-semibold">Sign Up</span>
        </Button>
        <Button type="link" href="/login">
          Log In
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
