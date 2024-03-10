import HypothesisModal from "../Hypothesis/HypothesisModal/HypothesisModal";
import styles from "./Finding.module.scss";
import { FC, useState } from "react";
import FindingModal from "./FindingModal/FindingModal";

interface FindingProps {
  finding: Finding;
}

const Finding: FC<FindingProps> = ({ finding }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <div
        className={`${styles.finding} space-y-4 relative`}
        onClick={handleClick}
      >
        <div className="h-full w-fullflex flex-col justify-center">
          <h4 className="font-medium relative text-[1.2rem] text-gray-600">
            <span className="text-gray-500 text-[1.1rem] absolute top-[-10px]">
              exploring:
            </span>
            {finding.hypothesis.title}
          </h4>
          <p className="text-[1.3rem] mt-[1vh] text-gray-800 font-medium">
            {finding.description}
          </p>
          <Footer finding={finding} />
        </div>
        <span className="text-[1.2rem] text-gray-500 font-medium absolute top-2 right-10">
          {new Date(finding.created).toDateString()}
        </span>
      </div>

      <FindingModal
        finding={finding}
        onClose={() => {
          setShowModal(false);
        }}
        isVisible={showModal}
      />
    </>
  );
};

const Footer = ({ finding }: FindingProps) => {
  return (
    <div className=" flex justify-between">
      {/* profile image placeholder */}
      <div className="flex space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-400"></div>
        <span className="text-[1.2rem]">{finding.user.name}</span>
      </div>
      <div>
        <span className="text-gray-600 text-[1.2rem] bg-teal-100 rounded-lg px-3 py-2 font-semibold">
          finding
        </span>
      </div>
    </div>
  );
};

export default Finding;
