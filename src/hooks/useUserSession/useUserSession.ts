import { UserModel } from "@/contexts/AuthContextProvider";
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "sonner";

export const useUserSession = () => {
  const getSession = useCallback(
    async (
      setUser?: Dispatch<SetStateAction<UserModel | undefined | null>>,
      setLoading?: Dispatch<SetStateAction<boolean>>
    ) => {
      try {
        setLoading?.(true);
        const result = await fetch("/api/me");
        if (result.status === 200) {
          const data: UserModel = await result.json();
          setLoading?.(true);
          setUser?.(data);
          return data;
        } else {
          setUser?.(null);
        }
      } finally {
        setLoading?.(false);
      }
    },
    []
  );

  return { getSession };
};
