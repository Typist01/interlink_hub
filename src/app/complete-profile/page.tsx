"use client";

import Button from "@/components/common/Button/Button";
import { FC, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Success from "../signup/Success";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/AuthContextProvider";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { user } = useUserContext();
  const router = useRouter();
  type Inputs = { name: string };
  const { register, handleSubmit } = useForm<Inputs>();
  const [state, setState] = useState<"success" | "loading" | "error" | "">("");
  const { refreshUser } = useUserContext();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setState("loading");
    const response = await fetch("/api/users/complete-user-profile", {
      method: "POST",
      body: JSON.stringify(data),
    });
    refreshUser();
    if (response.status === 200) {
      setState("success");
    } else {
      setState("error");
    }
  };

  // useEffect(() => {
  //   if (user.name) {
  //     router.push("/welcome");
  //   }
  // });

  if (state === "success" || user?.name) {
    setTimeout(() => {
      router.push("/welcome");
    }, 600);
    return <Success message="Profile complete" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-[12vh] h-screen flex flex-col items-center justify-center">
        <h1 className="text-[3rem] font-light mb-[3vh]">Enter a username</h1>

        <div className="relative h-20 w-full min-w-[200px] max-w-md">
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          />
          <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
        </div>
        <Button
          type="submit"
          className="mt-[3vh] hover:bg-gray-700 transition min-w-60"
        >
          {state === "loading" ? "Sending ..." : "Complete Profile"}
        </Button>
        {/* <button className="p-3 rounded"></button> */}
      </div>
    </form>
  );
};

export default Page;
