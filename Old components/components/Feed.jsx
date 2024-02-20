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
      {/* width of leftNav is w-[240px] so we substract that width from total width
      for feed */}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {/* loading is false by dafault but when we fetch it become true
          so we using condtion if loading not equls to true and we have
          search result then render this. Basicaly && returns value of second
          expression if first is truthy. */}
          {/* first searchResults for if searchResults not falsy then proceed */}
          {!loading &&
            searchResults &&
            searchResults?.map((item) => {
              // if item.type not equals to video then render/print nothing.
              if (item?.type !== "video") return false;
              return <VideoCard key={uuid()} video={item?.video} />;
            })}
        </div>
        {/* grid colum for mobile 1, tab or medium screen 2, for large screen 3 colum and for xl 4*/}
      </div>
    </div>
  );
};

export default Feed;
