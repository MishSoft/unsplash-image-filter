import React, { useContext } from "react";
import { Context } from "@/context/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  const { query, handleInputValue, handleSearch } = useContext(Context);

  return (
    <form
      onSubmit={handleSearch}
      className="pl-1 w-[500px] h-[50px] flex items-center justify-center "
    >
      <div className="relative pl-1 w-[300px] h-[50px] flex rounded-l items-center border border-black">
        <CiSearch size={20} />
        <Input
          onChange={handleInputValue}
          className="border-none"
          value={query}
          type="text"
          placeholder="Search images..."
        />
      </div>
      <Button
        type="submit"
        className="bg-[#262626]  h-full rounded-r text-white hover:text-[#262626] border-2 border-l-0 border-[#262626]"
      >
        Search
      </Button>
    </form>
  );
}
