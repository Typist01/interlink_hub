import { useCallback } from "react";
import { toast } from "sonner";

export const useGetHypothesis = () => {
  const getHypothesis = useCallback(
    async (setList?: (list: Hypothesis[]) => void) => {
      const response = await fetch("/api/hypothesis/list");
      if (response.status === 200) {
        const result = await response.json();
        setList?.(result.hypotheses);
        return result.hypotheses;
      } else {
        toast.error("We are having a problem, please try again later");
      }
    },
    []
  );
  return { getHypothesis };
};
