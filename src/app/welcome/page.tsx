"use client";
import { Loading } from "@/components/Loading/Loading";
import { useUserContext } from "@/contexts/AuthContextProvider";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { user } = useUserContext();
  const router = useRouter();
  const [state, setState] = useState<"frame1" | "frame2">("frame1");
  if (!user || !user.name) {
    router.replace("/login");
    return (
      <div
        className={`transition-all duration-200 ${
          state === "frame1" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-screen flex items-center justify-center flex-col gap-5">
          <Loading />
          <h1 className="text-teal-100">Loading</h1>
        </div>
      </div>
    );
  }
  if (state === "frame1") {
    setTimeout(() => {
      setState("frame2");
    }, 1500);
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-[3rem] font-normal">Welcome {user?.name}</h1>
      </div>
    );
  }
  if (state === "frame2") {
    setTimeout(() => {
      router.push("/global");
      setState("frame2");
    }, 1000);
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-[3rem] font-normal">This is the global hub</h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-[3rem] font-normal">This is the bad frame</h1>
    </div>
  );
};

export default Page;
