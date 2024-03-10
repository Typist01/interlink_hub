import { useCallback } from "react";
import { toast } from "sonner";

export const useGetFindings = () => {
  const getFindings = useCallback(
    async (setList?: (list: Finding[]) => void) => {
      const response = await fetch("/api/findings/list");
      if (response.status === 200) {
        const result = await response.json();
        setList?.(result.findings);
        return result.findings;
      } else {
        toast.error("We are having a problem, please try again later");
      }
    },
    []
  );
  return { getFindings };
};
