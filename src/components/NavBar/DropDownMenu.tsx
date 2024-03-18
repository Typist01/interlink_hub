import React, { PropsWithChildren } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/AuthContextProvider";

export function DropDown({ children }: PropsWithChildren) {
  const router = useRouter();
  const dropdownItemClass = "p-4 text-black";
  const textClass = "text-[1.6rem]";
  const { refreshUser, logout } = useUserContext();

  return (
    <Dropdown className="rounded">
      <DropdownTrigger>
        {children ?? <Button>Open Menu</Button>}
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className={dropdownItemClass} key="new">
          <span className={`${textClass}`}> View profile</span>
        </DropdownItem>

        <DropdownItem
          className={dropdownItemClass + " text-red-600 hover:text-white"}
          key="delete"
          color="danger"
          onClick={() => logout()}
        >
          <span className={`${textClass} `}>Log out</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
