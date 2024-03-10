import { ComponentProps, FC } from "react";
import { DropDown } from "./DropDownMenu";
import { Button } from "@nextui-org/button";
import Image from "next/image";

interface ProfileButtonProps {}

const ProfileButton: FC<ProfileButtonProps> = (
  props: ComponentProps<typeof Button>
) => {
  return (
    <>
      <DropDown>
        <Button className="bg-white hover:bg-gray-50 absolute right-[1rem] w-[5rem] h-[5rem] rounded-full border border-gray-300 hover:cursor-pointer hover:border-teal">
          <Image
            className="opacity-[35%]"
            alt="image of a tree under a starry night sky"
            src="/images/silouhette-1.webp"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </Button>
      </DropDown>
    </>
  );
};

export default ProfileButton;
