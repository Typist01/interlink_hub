import { FC } from "react";

interface FooterProps {
  // Define any props you might need
}

const Footer: FC<FooterProps> = ({}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 flex space-x-8 items-center justify-center text-center text-sm p-8 h-full">
      <h3 className="font-semibold">Interlink Hub</h3>
      <div className="text-gray-400">
        © {currentYear} Interlink Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
