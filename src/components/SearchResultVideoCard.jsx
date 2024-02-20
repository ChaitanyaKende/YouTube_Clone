import React, { useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";

import VideoLength from "../shared/videoLength";

const SearchResultVideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoUrl = `https://www.youtube.com/watch?v=${video?.videoId}`;

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div
        className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 ld:w-48 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={video?.thumbnails?.[0]?.url}
            alt="Thumbnail"
          />
          {!isHovered && !isVideoPlaying && (
            <VideoLength time={video?.lengthSeconds} />
          )}
          {isHovered && (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing={true}
              controls={false}
              loop={true}
              muted={true}
              className="absolute top-0 left-0"
            />
          )}
          {/* condition for some video not provide time,sec in that case 
          we have to not print time on thumbnail*/}
        </div>
        <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className="text-lg md:text-2xl font-semibold line-clamp-2 text-white">
            {video?.title}
          </span>
          {/* If video has no description then hide this span */}
          <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-white/[0.7] md:pr-24 md:my-4">
            {video?.descriptionSnippet}
          </span>
          {/* Author information visible on desktop only so we use hidden to hide it on mobile */}
          <div className="hidden md:flex items-center">
            <div className="flex items-start mr-3">
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={video?.author?.avatar[0]?.url}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold mt-2 text-white/[0.7] flex items-center">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                )}
              </span>
              <div className="flex text-sm font-semibold text-white/[0.7] truncate overflow-hidden">
                <span>{`${abbreviateNumber(
                  video?.stats?.views ?? video?.stats?.viewers,
                  2
                )} views`}</span>
                {/* ?? is nullish coalescing operator return left hand operand
              if it not "null" or "undefined" otherwise it return right operand.
              If video?.stats?.views is "null" or "undefined" it print
              video?.stats?.viewers and vice versa. Simply it handle either or case */}
                <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                  .
                </span>
                <span className="truncate">{video?.publishedTimeText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultVideoCard;