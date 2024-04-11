interface EmailProps {
  token: string;
}

import * as React from "react";
import { Tailwind, Button } from "@react-email/components";

export function Email(props: EmailProps) {
  const { token } = props;

  return (
    <Tailwind>
      <div className="text-3xl text-teal-300 p-[5vh] bg-black text-[1.7rem]">
        <p className="my-2">
          <span className="text-blue-300 font-bold">Hey!</span> It&apos;s great
          to have you on the Interlink Hub
        </p>
        <div className="p-[5vh] min-h-[50vh] bg-gray-800 rounded-sm">
          <div>
            <p className="text-[1.8rem]">
              Let&apos;s get
              <span className=""> started </span>
              with a{" "}
              <Button
                href={`https://interlink-hub.vercel.app/signup/verify-user?token=${token}`}
                className="inline-block rounded p-2 border border-teal-300 hover:bg-teal-800"
              >
                quick verification
              </Button>
            </p>
            <em> See you soon</em>
          </div>
          <div className="mt-[20vh]">
            <p className="text-teal-400 font-semibold mb-3">
              The Interlink Team
            </p>
            <a href="www.interlinkhub.com" className="">
              <h5 className="text-gray-400 font-bold">INTERLINK HUB</h5>
            </a>
          </div>
        </div>
      </div>
    </Tailwind>
  );
}
