import useOutsideClicker from "@/hooks/useOutisdeClicker";
import { FC, useRef } from "react";
import styles from "./AddHypothesisModal.module.scss";
import { dummyData } from "../Hypothesis/HypothesisModal/dummyData";
import Responses from "../Hypothesis/HypothesisModal/Responses/Responses";
import Button from "../common/Button/Button";
import { TextArea } from "react-aria-components";
import Editor from "../common/Button/TextEditor/Editor";

interface AddHypothesisModalProps {
  onClose: () => void;
  isVisible: boolean;
}

const AddHypothesisModal: FC<AddHypothesisModalProps> = ({
  onClose,
  isVisible,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = true;

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
            <label className=" flex flex-col">
              Title
              <input className="border rounded py-2 px-4 border-gray-300" />
            </label>
            <div className="flex-grow">
              <label className="flex flex-col mt-[3vh]">
                Description
                {/* Todo: replace textarea with self expanding editor */}
                {/* <Editor /> */}
                <textarea
                  rows={13}
                  className="resize-none border rounded py-2 px-4 border-gray-300"
                />
              </label>
            </div>
            <div className="flex  max-w-fit space-x-5">
              <Button className=" bg-gray-200 p-3 mt-5">Submit</Button>
              {/* TODO: make this work */}
              {/* <Button>Add files</Button> */}
            </div>
            <div>
              <Button onClick={onClose} className="text-gray-800 mt-[5vh]">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHypothesisModal;
