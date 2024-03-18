import { useCallback } from "react";
import { toast } from "sonner";

export const useGetHypothesis = () => {
  const getHypothesis = useCallback(
    async (setList?: (list: Hypothesis[]) => void) => {
      const response = await fetch("/api/hypothesis/list");
      if (response.status === 200) {
        const result = await response.json();
        setList?.(result.hypotheses);
        return { data: result.hypotheses, err: null };
      } else {
        return { findings: null, err: "fetch-error" };
      }
    },
    []
  );
  return { getHypothesis };
};
