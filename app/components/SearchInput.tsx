import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { Context } from "@/context/context";
import { Button } from "@/components/ui/button";

export default function SearchInput() {
  const { query, setQuery, handleInputValue, handleSearch } =
    useContext(Context);
  return (
    <form
      onSubmit={handleSearch}
      className="pl-1 w-[500px] h-[50px] flex items-center justify-center "
    >
      <div className="relative pl-1 w-[300px] h-[50px] flex rounded items-center border border-black">
        <CiSearch size={20} />
        <Input
          onChange={handleInputValue}
          className="border-none"
          value={query}
          type="text"
          placeholder="Search images..."
        />
        {query ? (
          <ul className="absolute w-full left-0 z-50 transition-all duration-200 top-[50px] max-h-[500px] bg-white rounded border flex flex-col">
            <li
              onClick={(e) => setQuery(e.currentTarget.innerText)}
              className="hover:bg-gray-100 p-2 cursor-pointer"
            >
              Lino
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
      <Button
        type="submit"
        className="bg-[#262626] ml-5 rounded text-white hover:text-[#262626] border-2 border-[#262626]"
      >
        Search
      </Button>
    </form>
  );
}
