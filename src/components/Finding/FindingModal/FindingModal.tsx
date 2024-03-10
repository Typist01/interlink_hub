import { FC, useEffect, useRef, useState } from "react";
import styles from "./FindingModal.module.scss";
import useOutsideClicker from "@/hooks/useOutisdeClicker";
import Button from "@/components/common/Button/Button";
import { getFiveResponses } from "@/components/Hypothesis/HypothesisModal/Responses/sampleResponses";
import Responses from "@/components/Hypothesis/HypothesisModal/Responses/Responses";

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
  const isLoggedIn = true;

  useOutsideClicker(modalRef, onClose);

  const [responses, setResponses] = useState<FindingResponse[]>([]);

  useEffect(() => {
    const responses = getFiveResponses();
    setResponses(responses);
  }, []);

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

              <div className="my-[7vh]">
                <Responses responses={responses} />
                {isLoggedIn && (
                  <div className="mt-[3vh]">
                    <h4>Respond</h4>
                    <div>
                      <textarea className="p-2 border border-gray-300 w-[30rem] rounded-lg mt-2"></textarea>
                    </div>
                    <Button className=" bg-gray-200 p-3">Submit</Button>
                  </div>
                )}
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
