import Link from "next/link";
import { FC, HTMLAttributes } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "link" | "";
  href?: string;
};

const Button: FC<ButtonProps> = ({ children, type, href, ...props }) => {
  if (type === "link") {
    return (
      <Link
        href={href || "#"}
        className="p-[0.9rem] border border-gray-400 hover:bg-gray-300 hover:border-transparent transition duration-300"
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className="p-3 border border-gray-400 hover:bg-gray-300 hover:border-transparent transition duration-300"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
