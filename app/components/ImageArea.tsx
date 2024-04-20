import React, { useContext } from "react";
import { Context } from "@/context/context";

export default function ImageArea() {
  const { imageDatas } = useContext(Context);

  if (!imageDatas) {
    return <div>Loading...</div>;
  }

  //   <img
  //               className="rounded cursor-pointer"
  //               key={image.id}
  //               src={image.urls.small}
  //               alt=""
  //             />
  return (
    <div className="w-full mt-10 border grid grid-cols-3 gap-5  border-t border-t-gray-100 p-10">
      {imageDatas ? (
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
        <p>No images found</p>
      )}
      <div id="observer" />
    </div>
  );
}
