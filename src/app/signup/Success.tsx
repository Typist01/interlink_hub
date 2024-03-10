import { FC } from "react";

interface SuccessProps {
  message?: string;
}

const Success: FC<SuccessProps> = ({ message }) => {
  return (
    <div className="h-screen mx-auto flex justify-center items-center flex flex-col space-y-2">
      <svg
        className="w-16 h-16 text-green-500 opacity-0"
        style={{
          animation: "fadeScale 0.5s ease-out forwards",
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <style>
        {`
              @keyframes fadeScale {
                from {
                  opacity: 0;
                  transform: scale(0.5);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
            `}
      </style>
      <span className="text-[2rem]">{message ?? "Successfully signed up"}</span>
    </div>
  );
};

export default Success;
