import React from "react";
import moment from "moment";

const VideoLength = ({ time }) => {
  const videoLenghtInSeconds = moment()
    ?.startOf("day")
    ?.second(time)
    ?.format("H:mm:ss");

  // div will be absolute couse it will be come over thumbnail
  return (
    <div className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
      {videoLenghtInSeconds}
    </div>
  );
};

export default VideoLength;
