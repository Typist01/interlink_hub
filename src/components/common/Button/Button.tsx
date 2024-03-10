import Link from "next/link";
import { FC, HTMLAttributes } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  type?: "submit" | "button";
  isLink?: boolean;
  href?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  isLink,
  href,
  className,
  type,
  ...props
}) => {
  if (isLink) {
    return (
      <Link
        href={href || "#"}
        className={
          "p-[0.9rem] border border-gray-400 hover:bg-gray-300 hover:border-transparent transition duration-300 " +
          className
        }
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type ?? "button"}
      className={
        "p-3 border border-gray-400 hover:bg-gray-300 hover:border-transparent transition duration-300 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
