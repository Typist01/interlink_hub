"use client";

import { FC } from "react";
import Response from "./Response";
import { generateHypothesisResponse } from "./sampleResponses";

interface ResponsesProps {
  responses: HypothesisResponse[];
}

const Responses: FC<ResponsesProps> = ({ responses }) => {
  return (
    <div>
      <h3 className="font-semibold">Responses</h3>
      <div className="space-y-2">
        {responses.length === 0
          ? "None"
          : responses.map((response) => (
              <Response key={response.id} response={response} />
            ))}
      </div>
    </div>
  );
};

export default Responses;
