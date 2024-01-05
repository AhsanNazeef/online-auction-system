import React from "react";
import Image from "next/image";

import logo from "../../public/logo.svg";

const Footer = () => {
  return (
    <div className="bg-gray-50 bottom-0 relative w-full">
      <div className="mx-auto mt-12 max-w-7xl flex justify-center">
        <footer className="px-4 py-10 inline-flex items-center">
          <span className="mr-5">
            <Image src={logo} alt="logo" width={40} height={40} />
          </span>
          <p className="text-base font-semibold text-gray-700">
            © 2024 Online Auction System
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
