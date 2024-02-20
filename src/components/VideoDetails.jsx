import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import uuid from "react-uuid";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "../components/SuggestionVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  // Here we can get id of video which we pass in url by the use of useParams.
  const { setLoading } = useContext(Context);

  useEffect(() => {
    // Whenever we are on this VideoDetails page then we have to add class custom-h.
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  // method for get video details using id.
  const fetchVideoDetails = () => {
    setLoading(true);
    // It will return promise so we can then on it.
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      // We have to send this res to setVideo state.
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    // Here we have to add an endpoint for fetching related contents.
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      //Now we have to send this res to setRelatedVideos state.
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    // Height will 100%-header height which is 56px.
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls={true}
              // cotrols provide youtube controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt="Avatar"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>

            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                <span>{`${abbreviateNumber(
                  video?.stats?.likes,
                  2
                )} Likes`}</span>
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                {/* <AiOutlineLike className="text-xl text-white mr-2" /> */}
                {`${abbreviateNumber(
                  video?.stats?.views ?? video?.stats?.viewers,
                  2
                )} Views`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {/* We save related video data in relatedVideos using setRelatedVideos method */}
          {relatedVideos?.contents?.map((item) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={uuid()} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

// useParams is used to access the parameters from the URL in a functional component.
// We can get id of current playing video using useParams.
