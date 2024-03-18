"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Success from "../Success";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@/components/Loading/Loading";

interface routeProps {}

const Page: FC<routeProps> = ({}) => {
  type State = "loading" | "success" | "error";
  const [state, setState] = useState<State>("loading");
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchData = useCallback(
    async (token: string) => {
      const result = await fetch("/api/users/verify-account?token=" + token, {
        method: "POST",
      });
      console.log("result status is ", result.status);
      if (result.status === 200) {
        setState("success");

        setTimeout(() => {
          router.push("/complete-profile");
        }, 1000);
        return;
      } else {
        return setState("error");
      }
    },
    [router]
  );

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setState("error");
      return;
    }
    fetchData(token);
  }, [fetchData, searchParams]);

  if (state === "loading") {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-5">
        <Loading />
        <h1 className="text-teal-100">Verifying</h1>
      </div>
    );
  }
  if (state === "error")
    return (
      <div className="h-screen flex flex-col items-center mt-[20vh] w-full">
        <div role="alert" className="w-full max-w-4xl">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Unexpected error
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-8 py-5 text-red-700">
            <p className="text-[1.5rem]">
              We could not verify your email at this time. Please try again
              later.
            </p>
            <p className="text-[1.4rem]">
              If the issue persists, please contact{" "}
              <strong>support@interlinkhub.com</strong>
            </p>
          </div>
        </div>
      </div>
    );
  return <Success message="Your email has been verified" />;
};

export default Page;
