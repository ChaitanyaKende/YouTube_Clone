import React from "react";
import uuid from "react-uuid";

const LeftNavMenuItem = ({ text, icon, className, action }) => {
  return (
    // We apply class which we send from LeftNav as a prop by conditionaly.
    // If selectedCategory===item.name then we get bg-white/[0.15] else empty string
    // with added classes.
    <div
      key={uuid()}
      className={
        "text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " +
        className
      }
      onClick={action}
    >
      <span className="text-xl mr-5">{icon}</span>
      {text}
    </div>
  );
};

export default LeftNavMenuItem;
