import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";
import uuid from "react-uuid";

const LeftNav = () => {
  const { selectCategories, setSelectCategories, mobileMenu } =
    useContext(Context);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        // If type equals to category in that case we passed name in setSelectCategories method
        return setSelectCategories(name);
      case "home":
        return setSelectCategories(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
        mobileMenu ? "translate-x-0" : ""
      }`}
    >
      {/* If mobileMunu true then apply class translate-x-0 if false apply nothing */}
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={uuid()}>
              {/* We want render Home at feed in category section but we pass
                name:"New" (for onclick on Home we sending in backend New for new categories video) that's why we use condition for it if type=home
                then render Home else item.name cause, for other categories we pass 
                same name for sending request to api as it seen of feed
                ex. name:"Trending" to send request and for render as it is Trending.*/}
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                  // If we on another page after clicking category we navigate to home page that's the use of navigate here.
                }}
                className={`${
                  selectCategories === item.name ? "bg-white/[0.15]" : ""
                }`}
                // If selectCategories is equal to item.name then background
                // white with opacity 0.15 else empty string.
              />
              {/* action is nothing but prop for onclick method */}
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">Clone by: Chaitanya</div>
      </div>
    </div>
  );
};

export default LeftNav;
