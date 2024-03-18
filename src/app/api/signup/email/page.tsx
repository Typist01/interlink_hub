import { FC } from "react";
import { Email } from "./Email";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="border border-black w-[100vw]">
      <Email token={"some-test-data"} />
    </div>
  );
};

export default page;
