import React, { useContext, useEffect } from "react";
import uuid from "react-uuid";

import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          
          {!loading &&
            searchResults &&
            searchResults?.map((item) => {
              // if item.type not equals to video then render/print nothing.
              if (item?.type !== "video") return false;
              return <VideoCard key={uuid()} video={item?.video} />;
            })}
        </div>
        {/*  Grid layout with 1 column for mobile, 2 columns for tablet/small screens, 3 columns for large screens, and 4 columns for extra-large screens*/}
      </div>
    </div>
  );
};

export default Feed;
