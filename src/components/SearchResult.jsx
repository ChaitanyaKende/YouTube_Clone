import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);
  //setLoading for make loading state true when we call api after getting response
  // we make it false.

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);
  // Whenver searchQuery change in that case useEffect will call.

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      // We get contents in res, we passing contents to setResult.
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />

      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item?.video;
            return <SearchResultVideoCard key={uuid()} video={video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

// useParams for access query from url, which we search.
