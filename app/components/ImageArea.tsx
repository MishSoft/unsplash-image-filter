import React, { useContext } from "react";
import { Context } from "@/context/context";
import { AiOutlineLoading } from "react-icons/ai";

export default function ImageArea() {
  const { imageDatas } = useContext(Context);

  return (
    <div
      className={`w-full mt-10 ${
        imageDatas.length !== 0
          ? "grid grid-cols-3 gap-5"
          : "flex items-center justify-center"
      }  border-t border-t-gray-100 p-10`}
    >
      {imageDatas.length !== 0 ? (
        imageDatas.map(
          (image: { urls: any; id: React.Key | null | undefined }) => (
            <div
              className="w-full h-[300px] rounded cursor-pointer hover:transform hover:scale-105 transition-all duration-200 hover:shadow"
              key={image.id}
              style={{
                backgroundImage: `url(${image.urls.small})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
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
