import { FC, useRef } from "react";
import styles from "./AddHypothesisModal.module.scss";
import Button from "../common/Button/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import Editor from "../common/Button/TextEditor/Editor";

interface AddHypothesisModalProps {
  onClose: () => void;
  isVisible: boolean;
  refreshHypothesis: () => void;
}

const AddHypothesisModal: FC<AddHypothesisModalProps> = ({
  onClose,
  isVisible,
  refreshHypothesis,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
  }>();

  const onSubmit = async (data: { title: string; description: string }) => {
    const result = await fetch("/api/users/add-new-hypothesis", {
      method: "POST",
      body: JSON.stringify({ ...data }),
    });
    if (result.status === 200) {
      toast.success("Hypothesis added");
      refreshHypothesis();
      onClose();
      reset();
      return;
    }
    return toast.error("Something went wrong, please try again");
  };

  return (
    <>
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
              <label className=" flex flex-col">
                Title
                <input
                  {...register("title", { required: true })}
                  className="border rounded py-2 px-4 border-gray-300 text-gray-700"
                />
                {errors.title && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <div className="flex-grow">
                <label className="flex flex-col mt-[3vh]">
                  Description
                  {/* Todo: replace textarea with self expanding editor */}
                  {/* <Editor /> */}
                  <textarea
                    {...register("description", { required: true })}
                    rows={13}
                    className="resize-none border rounded py-2 px-4 text-gray-700"
                  />
                  {errors.description && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </label>
              </div>
              <div className="flex  max-w-fit space-x-5">
                <Button
                  type="submit"
                  className=" bg-gray-600 hover:bg-gray-500 transition  p-3 mt-5"
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
                  className="text-gray-200 mt-[5vh]"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddHypothesisModal;
