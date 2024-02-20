import React, { useState } from "react";

import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";

import VideoLength from "../shared/videoLength";
const SuggestionVideoCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUrl = `https://www.youtube.com/watch?v=${video?.videoId}`;

  return (
    // Because of this link we got to videoDetails page.
    <Link
      to={`/video/${video?.videoId}`}
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      <div className="flex mb-3">
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-50 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={video?.thumbnails?.[0]?.url}
            alt="Thumbnails"
          />
          {/* condition for some video not provide time,sec in that case 
          we have to not print time on thumbnail*/}
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
          {isPlaying && (
            <div className="absolute top-0 left-0 w-full h-full">
              <ReactPlayer
                url={videoUrl}
                playing={true}
                controls={false}
                muted={true}
                width="100%"
                height="100%"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
          <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
            {video?.title}
          </span>
          <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2  text-white/[0.7] flex items-center">
            {video?.author?.title}
            {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
              <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
            )}
          </span>
          <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
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
    </Link>
  );
};

export default SuggestionVideoCard;
