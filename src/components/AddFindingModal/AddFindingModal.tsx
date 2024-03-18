import useOutsideClicker from "@/hooks/useOutisdeClicker";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./AddFindingModal.module.scss";
import { dummyData } from "../Hypothesis/HypothesisModal/dummyData";
import Responses from "../Hypothesis/HypothesisModal/Responses/Responses";
import Button from "../common/Button/Button";
import { TextArea } from "react-aria-components";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import HypothesisList from "./HypothesisList";
import { generateDummyHypothesis } from "../Hypothesis/HypothesisModal/Responses/sampleResponses";

interface AddFindingModalProps {
  onClose: () => void;
  isVisible: boolean;
  refreshItems: () => void;
}

const SelectedHypothesis = ({ hypothesis }: { hypothesis: Hypothesis }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  return (
    <div className="">
      <p className="font-medium text-[1.6rem] text-gray-800">
        {hypothesis.title}
      </p>
      <p className="text-[1.5rem] text-gray-400 ml-3">
        by {hypothesis.user.name}
      </p>
      <div className="w-full flex">
        <span
          onClick={() => setShowDescription((v) => !v)}
          className="text-[1.4rem] text-teal-600 hover:text-teal-500 mx-auto cursor-pointer"
        >
          {showDescription ? "hide" : "see"} description
        </span>
      </div>
      {showDescription && (
        <>
          <h5 className="text-[1.4rem] font-medium text-gray-700">
            Description
          </h5>
          <p className="text-[1.5rem] text-gray-600">
            {hypothesis.description}
          </p>
        </>
      )}
    </div>
  );
};
const AddFindingModal: FC<AddFindingModalProps> = ({
  onClose,
  isVisible,
  refreshItems,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showTitles, setShowTitles] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
    hypothesisId?: string;
  }>();

  const hypothesisTitle = watch("title");

  // Submit function
  const onSubmit = async (data: {
    title: string;
    description: string;
    hypothesisId?: string;
  }) => {
    const result = await fetch("/api/users/add-new-finding", {
      method: "POST",
      body: JSON.stringify({ ...data, hypothesisId: selectedHypothesis?.id }),
    });
    if (result.status === 200) {
      toast.success("Finding added");
      refreshItems();
      onClose();
      reset();
      return;
    }
    return toast.error("Something went wrong, please try again");
  };
  const [selectedHypothesis, setSelectedHypothesis] = useState<
    Hypothesis | undefined
  >();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <label className=" flex flex-col text-gray-600 text-[1.5rem]">
              <span className="text-[1.4rem] font-medium text-gray-900">
                Hypothesis
                <span className="text-[1.4rem] text-light text-gray-500">
                  {" "}
                  (Link to existing or create new)
                </span>
              </span>
              {selectedHypothesis ? (
                <>
                  <SelectedHypothesis hypothesis={selectedHypothesis} />
                  <div>
                    <span
                      className="inline-block ext-gray-500 font-semibold text-[1.2rem] text-red-800 cursor-pointer"
                      onClick={() => setSelectedHypothesis(undefined)}
                    >
                      clear
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <input
                    {...register("title", {
                      required: true,
                      onBlur: () => setShowTitles(false),
                    })}
                    onFocus={() => setShowTitles(true)}
                    className="border rounded py-2 px-4 border-gray-300"
                    placeholder="What if ..."
                  />
                  {showTitles && (
                    <HypothesisList
                      hypothesisTitle={hypothesisTitle}
                      setSelectedHypothesis={setSelectedHypothesis}
                    />
                  )}
                </>
              )}
            </label>
            <div className="flex-grow">
              <label className="flex flex-col mt-[1vh]">
                Finding
                {/* Todo: replace textarea with self expanding editor */}
                {/* <Editor /> */}
                <textarea
                  {...register("description", { required: true })}
                  placeholder="... I found the stars in a beuatiful hexagonal pattern"
                  rows={13}
                  className="resize-none border rounded py-2 px-4 border-gray-300 outline-none focus:ring-1 focus:ring-teal-400"
                />
              </label>
            </div>
            <div className="flex  max-w-fit space-x-5">
              <Button
                type="submit"
                className=" bg-gray-200 p-3 mt-5 bg-teal-100 hover:bg-teal-200"
              >
                Submit
              </Button>
              {/* TODO: make this work */}
              {/* <Button>Add files</Button> */}
            </div>
            <div>
              <Button
                type="button"
                onClick={onClose}
                className="text-gray-800 mt-[5vh]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddFindingModal;
