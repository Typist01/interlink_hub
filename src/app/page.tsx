import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <main data-testid="home-page">
      <div className=" h-[70vh] p-[3vh] 2xl:p-[7vh] flex flex-col relative">
        <Image
          className="opacity-[50%]"
          alt="image of a tree under a starry night sky"
          src="/images/sparkles-crimson.webp"
          fill={true}
          style={{ objectFit: "cover" }}
        />

        <div className="mt-20 space-y-5 z-10">
          <h1 className="font-thin text-[4rem]">Share your findings</h1>
          <h1 className="font-light text-3xl ml-10">
            with <span className="font-semibold"> the world</span>
          </h1>
        </div>
        <div className="flex-1 flex justify-center z-10">
          <Link
            href={"/global"}
            className="p-5 rounded-lg self-end hover:bg-teal-400 bg-teal-500 transition"
          >
            View Global Hub
          </Link>
        </div>
      </div>

      <div className="m-[15vh]">
        <h1 className="text-[2rem]">Tell the world what </h1>

        <h1 className="text-[4rem]">{"you've found"}</h1>
        <div className="mx-auto text-center flex items-center justify-center">
          <svg
            className="stroke-[0.2] stroke-yellow-100 h-[12rem] "
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5" />
            <path d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471" />
          </svg>
        </div>
        <p className="mt-[10vh] text-end">
          A place to <strong>find new ideas</strong>
          <br></br>
          <em>and explore</em>
        </p>
      </div>
    </main>
  );
};

export default Page;
