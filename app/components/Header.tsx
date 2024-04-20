import React from "react";
import { FaAngleRight } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="p-5 bg-white border-b flex items-center justify-between border-b-gray-100">
      <img src="/images/logo-black.svg" alt="Unsplash oficial image" />
      <a href="https://unsplash.com/" className="hover:underline flex items-center gap-2" target="_blank">
        Oficial Unsplash Website
        <FaAngleRight />
      </a>
    </div>
  );
}
