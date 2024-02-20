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
      // If type is equal to 'category', we pass the name to the setSelectCategories method.
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
        mobileMenu ? "translate-x-1" : ""
      }`}
    >

      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={uuid()}>
              {/* We want to render "Home" in the feed's category section. However, when clicking on "Home," we send "New" to the backend for new categories' videos. To achieve this, we use a condition: if the type is "home," render "Home"; otherwise, render item.name. For other categories, we pass the same name for sending requests to the API as seen in the feed, e.g., name:"Trending" for sending the request and for rendering as it is, "Trending".
*/}
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                  // If we navigate to another page after clicking a category, we navigate back to the home page. This is the purpose of using navigate here.
                }}
                className={`${
                  selectCategories === item.name ? "bg-white/[0.15]" : ""
                }`}
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
