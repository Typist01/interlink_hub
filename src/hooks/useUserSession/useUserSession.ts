import { UserModel } from "@/contexts/AuthContextProvider";
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "sonner";

export const useUserSession = () => {
  const getSession = useCallback(
    async (
      setUser?: Dispatch<SetStateAction<UserModel | undefined | null>>
    ) => {
      const result = await fetch("/api/me");
      if (result.status === 200) {
        const data: UserModel = await result.json();
        setUser?.(data);
        return data;
      } else {
        setUser?.(null);
        toast.error("We encountered a problem, please try again later.");
      }
    },
    []
  );

  return { getSession };
};
