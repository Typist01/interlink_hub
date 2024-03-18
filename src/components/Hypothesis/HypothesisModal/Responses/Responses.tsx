"use client";

import { FC } from "react";
import Response from "./Response";

interface ResponsesProps {
  responses: PostResponse[];
}

const Responses: FC<ResponsesProps> = ({ responses }) => {
  return (
    <div>
      <h3 className="font-normal text-gray-600">Responses</h3>
      <div className="space-y-3 mt-3">
        {responses.length > 0 &&
          responses.map((response, i) => (
            <Response key={response.id} response={response} />
          ))}
      </div>
    </div>
  );
};

export default Responses;
