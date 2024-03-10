"use client";
import styles from "./Hypothesis.module.scss";
import { FC, useState } from "react";
import HypothesisModal from "./HypothesisModal/HypothesisModal";
import Image from "next/image";

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
      <div
        className={`${styles.hypothesis} space-y-4 relative`}
        onClick={handleClick}
      >
        <div className="h-full w-full flex flex-col justify-center">
          <h4 className="font-medium text-[1.4rem] text-gray-800">
            {hypothesis.title}
          </h4>
          <Footer hypothesis={hypothesis} />
        </div>
        <span className="text-[1.2rem] text-gray-500 font-medium absolute top-2 right-10">
          {new Date(hypothesis.created).toDateString()}
        </span>
      </div>
      <HypothesisModal
        hypothesis={hypothesis}
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
    <div className="h-10">
      <div className=" flex justify-between ">
        {/* profile image placeholder */}
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          <span className="text-[1.2rem]">{hypothesis.user.name}</span>
        </div>
        <div>
          <span className="text-gray-600 text-[1.2rem] bg-teal-100 rounded-lg px-3 py-2 font-semibold">
            hypothesis
          </span>
        </div>
      </div>
    </div>
  );
};
export default Hypothesis;
