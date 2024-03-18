import { log } from "console";
import { Dispatch, SetStateAction, useCallback } from "react";

const useGetResponses = () => {
  const getResponses = useCallback(
    async (
      postId: string,
      postType: "hypothesis" | "finding",
      setResponses?: Dispatch<
        SetStateAction<{ responses: PostResponse[]; hasNextPage: boolean }>
      >,
      page?: number,
      setLoading?: Dispatch<SetStateAction<boolean>>
    ) => {
      console.log("getResponses called");
      setLoading?.(true);
      const response = await fetch(
        `/api/posts/responses/list?postId=${postId}&postType=${postType}&page=${
          page ?? 1
        }&limit=${10}`
      );

      if (response.status !== 200) {
        setResponses?.({ responses: [], hasNextPage: false });
        setLoading?.(false);
        return;
      }
      const data = (await response.json()) as {
        nextPage?: boolean;
        responses: PostResponse[];
        total?: number;
      };
      setResponses?.({
        responses: data.responses,
        hasNextPage: !!data.nextPage,
      });
      setLoading?.(false);
      return response;
    },
    []
  );
  return { getResponses };
};

export { useGetResponses };
