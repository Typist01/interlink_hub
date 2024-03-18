import { FC, useEffect, useRef, useState } from "react";
import styles from "./FindingModal.module.scss";
import useOutsideClicker from "@/hooks/useOutisdeClicker";
import Button from "@/components/common/Button/Button";
import { getFiveResponses } from "@/components/Hypothesis/HypothesisModal/Responses/sampleResponses";
import Responses from "@/components/Hypothesis/HypothesisModal/Responses/Responses";
import ResponsesUI from "@/components/Hypothesis/HypothesisModal/ResponsesUI";

interface FindingModalProps {
  onClose: () => void;
  isVisible: boolean;
  finding: Finding;
}

const FindingModal: FC<FindingModalProps> = ({
  onClose,
  isVisible,
  finding,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [truncateDescription, setTruncateDescription] = useState<boolean>(
    finding.description.length > 100
  );

  useOutsideClicker(modalRef, onClose);
  return (
    <>
      <div
        className={`${styles["modal-backdrop"]} ${
          isVisible ? styles["visible"] : ""
        }`}
      >
        <div
          ref={modalRef}
          className={`${styles["modal-container"]} ${
            isVisible ? styles["visible"] : ""
          }

        `}
        >
          <div className={`${styles["modal-content"]}`}>
            <h1 className="font-bold">{finding.hypothesis.title}</h1>
            <div className="flex-grow">
              <p
                className={`mt-[3vh] font-medium ${
                  truncateDescription ? styles[`truncate-description`] : ""
                }`}
              >
                {finding.description}
              </p>
              {
                <button
                  className="text-[1.4rem] font-bold text-gray-400"
                  onClick={() => {
                    setTruncateDescription((v) => !v);
                  }}
                >
                  {truncateDescription ? "Read More" : "Read Less"}
                </button>
              }

              <div className="mt-[5vh] mb-[2vh]">
                {/* <Responses responses={responses} /> */}
                <div className="mt-[5vh] mb-[2vh]">
                  <ResponsesUI id={finding.id} postType={"finding"} />
                </div>
              </div>
            </div>
            <div>
              <Button onClick={onClose} className="text-gray-800 ">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindingModal;
