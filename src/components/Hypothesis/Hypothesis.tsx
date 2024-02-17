"use client";
import styles from "./Hypothesis.module.scss";
import { FC, useState } from "react";
import HypothesisModal from "./HypothesisModal/HypothesisModal";

interface HypothesisProps {
  hypothesis: Hypothesis;
}

const Hypothesis: FC<HypothesisProps> = ({ hypothesis }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className={`${styles.hypothesis} space-y-4`} onClick={handleClick}>
        <h4 className="font-medium">{hypothesis.title}</h4>
        <Footer hypothesis={hypothesis} />
      </div>
      <HypothesisModal
        onClose={() => {
          setShowModal(false);
        }}
        isVisible={showModal}
      />
    </>
  );
};

const Footer = ({ hypothesis }: HypothesisProps) => {
  return (
    <div>
      <div className=" flex justify-between">
        {/* profile image placeholder */}
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          <span className="text-[1.2rem]">{hypothesis.user.name}</span>
        </div>
        <div>
          <span className="text-[1.2rem] bg-teal-100 rounded-lg px-3 py-2 font-semibold">
            hypothesis
          </span>
        </div>
      </div>
      <p className="text-[1rem]">
        {" "}
        replies:
        <span className="font-semibold">3</span>
        <span> likes</span>
        <span>
          <svg
            className="h-5 w-5 text-gray-100 bg-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <path
              fill={"#9CA3AF"}
              d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z"
            />
          </svg>
        </span>
      </p>
    </div>
  );
};
export default Hypothesis;
