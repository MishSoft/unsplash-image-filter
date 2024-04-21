import React, { useContext } from "react";
import { Context } from "@/context/context";
import { AiOutlineLoading } from "react-icons/ai";

export default function ImageArea() {
  const { imageDatas } = useContext(Context);

  return (
    <div
      className={`w-full mt-10 ${
        imageDatas.length !== 0
          ? "pb-10 gap-5 sm:columns-4 sm:space-y-3 border sm:block flex flex-wrap items-center justify-center"
          : "flex items-center justify-center"
      }  border-t border-t-gray-100 p-10`}
    >
      {imageDatas.length !== 0 ? (
        imageDatas.map(
          (image: { urls: any; id: React.Key | null | undefined }) => (
            <img
              key={image.id}
              className="rounded cursor-pointer hover:transform hover:scale-105 transition-all duration-200 hover:shadow"
              src={image.urls.small}
              alt=""
            />
          )
        )
      ) : (
        <div className="w-full flex items-center justify-center h-full ">
          <p>No images found</p>
        </div>
      )}
      <div id="observer" />
    </div>
  );
}
