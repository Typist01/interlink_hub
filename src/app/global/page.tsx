"use client";
import AddFindingModal from "@/components/AddFindingModal/AddFindingModal";
import AddHypothesisModal from "@/components/AddHypothesisModal/AddHypothesisModal";
import Finding from "@/components/Finding/Finding";
import Hypothesis from "@/components/Hypothesis/Hypothesis";
import HypothesisModal from "@/components/Hypothesis/HypothesisModal/HypothesisModal";
import {
  generateDummyFinding,
  generateDummyHypothesis,
  generateHypothesisResponse,
} from "@/components/Hypothesis/HypothesisModal/Responses/sampleResponses";
import { FC, useEffect, useState } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);
  useEffect(() => {
    const hypotheses = [
      generateDummyHypothesis(),
      generateDummyHypothesis(),
      generateDummyHypothesis(),
    ];
    setHypotheses(hypotheses);
  }, []);
  const [showAddHypothesisModal, setShowAddHypothesisModal] = useState(false);
  const [showAddFindingModal, setShowAddFindingModal] = useState(false);
  const handleCloseHypothesis = () => setShowAddHypothesisModal(false);
  const handleCloseFinding = () => setShowAddFindingModal(false);
  return (
    <div className="mt-[3vh]">
      <div className="space-x-2 flex justify-end mt-5 mr-[7vh] 2xl:mr-[5vh] my-[3vh]">
        <button
          className="bg-gray-400 rounded px-4 py-3"
          onClick={() => setShowAddHypothesisModal(true)}
        >
          {" "}
          + Hypothesis
        </button>
        <button
          onClick={() => setShowAddFindingModal(true)}
          className="bg-gray-400 rounded px-4 py-3"
        >
          {" "}
          + Finding
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {hypotheses.map((hypothesis) => (
          <Hypothesis key={hypothesis.id} hypothesis={hypothesis} />
        ))}
        <Finding finding={generateDummyFinding()} />
        <Finding finding={generateDummyFinding()} />
        <Finding finding={generateDummyFinding()} />
      </div>
      <AddHypothesisModal
        isVisible={showAddHypothesisModal}
        onClose={handleCloseHypothesis}
      />
      <AddFindingModal
        isVisible={showAddFindingModal}
        onClose={handleCloseFinding}
      />
    </div>
  );
};

export default Page;
