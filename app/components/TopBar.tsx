import React from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="flex flex-col items-center w-full justify-center pt-10">
      <div className="flex items-center gap-10 pb-10">
        <Link
          to="/"
          className="font-bold text-[20px] border w-[100px] h-[40px] flex items-center justify-center rounded hover:bg-gray-100"
        >
          Home
        </Link>
        <Link
          to="/history"
          className="font-bold text-[20px] border w-[100px] h-[40px] flex items-center justify-center rounded hover:bg-gray-100"
        >
          History
        </Link>
      </div>
      <SearchInput />
    </div>
  );
}
