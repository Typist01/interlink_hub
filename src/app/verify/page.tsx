"use client";
import { Loading } from "@/components/Loading/Loading";
import { useUserContext } from "@/contexts/AuthContextProvider";
import { FC, useEffect, useState } from "react";
import Success from "../signup/Success";
import { useRouter } from "next/navigation";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const { user } = useUserContext();
  const [resent, setResent] = useState(false);

  if (user?.verified) {
    setTimeout(() => {
      router.push("/");
    }, 1000);
    return <Success message="You're verified!" />;
  }

  if (user === null) {
    setTimeout(() => {
      router.push("/");
    }, 1000);
    return <Success message="You're verified!" />;
  }

  const handleResendClick = async () => {
    const result = await fetch("/api/signup/verify", { method: "POST" });
    if (result.status === 200) {
      setResent(true);
    }
    console.log(result);
  };

  return (
    <div className="h-screen flex flex-col mt-[20vh] items-center text-center">
      <div className="space-y-5 mb-[5vh]">
        <h1 className="text-teal-600 text-[3rem]">Welcome!</h1>
        <h2 className="text-teal-600">You&apos;re not yet verified</h2>
      </div>
      <h3 className="text-teal-600">
        Check your email for a verification link
        <br />
      </h3>
      {resent ? (
        <p>email sent!</p>
      ) : (
        <p className="text-teal-600 text-[1.2rem] font-semibold">
          or
          <button
            onClick={() => handleResendClick()}
            className="font-bold hover:text-teal-400"
          >
            &nbsp; click here&nbsp;
          </button>
          to resend
        </p>
      )}
    </div>
  );
};

export default Page;
