import { FC, useEffect, useRef, useState } from "react";
import styles from "./HypothesisModal.module.scss";
import useOutsideClicker from "@/hooks/useOutisdeClicker";
import { dummyData } from "./dummyData";
import Button from "@/components/common/Button/Button";
import { getFiveResponses } from "./Responses/sampleResponses";
import ResponsesUI from "./ResponsesUI";

interface HypothesisModalProps {
  onClose: () => void;
  isVisible: boolean;
  hypothesis: Hypothesis;
}

const HypothesisModal: FC<HypothesisModalProps> = ({
  onClose,
  isVisible,
  hypothesis,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [truncateDescription, setTruncateDescription] = useState<boolean>(
    dummyData.description.length > 100
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
            <h1 className="font-bold">{hypothesis?.title}</h1>
            <div className="flex-grow">
              <p
                className={`mt-[3vh] font-medium ${
                  truncateDescription ? styles[`truncate-description`] : ""
                }`}
              >
                {hypothesis?.description}
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
                <ResponsesUI id={hypothesis.id} postType={"hypothesis"} />
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

export default HypothesisModal;
