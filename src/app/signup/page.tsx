"use client";

import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Success from "./Success";
import { useRouter } from "next/navigation";

interface pageProps {}

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const Page: FC<pageProps> = ({}) => {
  const inputClasses = `bg-gray-100 focus:bg-blue-50 transition h-[4rem] text-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-indigo-500 text-md`;
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();

  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // ... proceed with form submission if passwords match
    const { confirmPassword, ...payload } = data;
    if (confirmPassword !== data.password) {
      return;
    }
    try {
      const result = await fetch(`/api/signup`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      console.log("entered statement after fetch", result);
      if (result.status === 422) {
        toast.error("An account with this email already exists");
        return;
      }
      if (result.status === 201) {
        setResult("success");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        throw new Error(
          "could not create account: server responded with " +
            JSON.stringify(result)
        );
      }
    } catch (e) {
      toast.error("Problem creating an account: try again later");
      console.log("error is ", e);
    }
  };

  const password = watch("password");
  const labelClasses = `
  block text-[2xl] font-medium text-gray-300 text-gray-100`;
  if (result === "success") {
    return <Success />;
  }

  return (
    <div className="max-w-sm mx-auto mt-[10vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* TODO: fix isLoading to turn off form handling during api call */}
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            disabled={isSubmitting}
            id="email"
            type="email"
            {...register("email", { required: "required" })}
            className={inputClasses}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="password" className={labelClasses}>
            Password
          </label>
          <input
            disabled={isSubmitting}
            id="password"
            type="password"
            {...register("password", { required: "required" })}
            className={inputClasses}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClasses}>
            Confirm Password
          </label>
          <input
            disabled={isSubmitting}
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "required",
              validate: {
                confirmPassword: (value) =>
                  value === password || "passwords must match",
              },
            })}
            className={inputClasses}
          />
          {errors.confirmPassword?.message && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-4 px-4 mt-[3vh] border border-transparent text-xl font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 transition-all duration-200 ease-in-out "
          >
            {isSubmitting && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <span>Sign up</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
