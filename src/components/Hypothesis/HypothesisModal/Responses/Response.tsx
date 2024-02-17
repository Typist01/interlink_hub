"use client";
import { FC } from "react";

interface ResponseProps {
  response: HypothesisResponse;
}

const Response: FC<ResponseProps> = ({ response }) => {
  return (
    <div className="py-6 px-8 bg-teal-200 space-y-2">
      <p>{response.response}</p>
      <Footer response={response} />
    </div>
  );
};

const Footer = ({ response }: ResponseProps) => {
  return (
    <div className="flex items-center mt-2 w-full justify-between">
      {/* profile image */}
      <div className="flex items-center space-x-2">
        <div className="bg-gray-100 h-8 w-8 rounded-full"></div>
        <span className="text-[1.2rem]">{response.user.name}</span>
      </div>
      {/* timestamp */}
      <span className="text-[1.2rem] ">
        {response.created.toLocaleDateString()}
      </span>
    </div>
  );
};

export default Response;
