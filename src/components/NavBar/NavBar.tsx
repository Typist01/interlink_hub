"use client";
import { FC } from "react";
import Button from "../common/Button/Button";
import Link from "next/link";
import { useUserContext } from "@/contexts/AuthContextProvider";
import ProfileButton from "./ProfileButton";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  const { user } = useUserContext();
  return (
    <>
      <div className="relative bg-teal-100 text-gray-900 p-8 px-[7vh] 2xl:px-[5vh] flex justify-between items-center">
        <Link href="/" className="text-4xl font-bold text-gray-800 text-center">
          Interlink Hub
        </Link>

        {user === null && (
          <div className="space-x-2">
            <Button isLink href="/signup">
              <span className="font-semibold">Sign Up</span>
            </Button>
            <Button isLink href="/login">
              Log In
            </Button>
          </div>
        )}
        {user && <ProfileButton />}
      </div>
    </>
  );
};

export default NavBar;
