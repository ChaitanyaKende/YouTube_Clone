import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu } = useContext(Context);
  // Context is hook(createContext) in contextApi which we export as const Context
  // Because of that we can use all the values which we pass from contextApi.js

  // To hadle search query which we type in input field. When we search then
  // this method will call.

  const navigate = useNavigate();
  // To use useNavigate we have to asign in const. We can give any name here we
  // give navigate.

  const searchQueryHandler = (event) => {
    // Here we targeting enter, after type text in textbox we press enter.
    // We want to call api when press enter and when click button
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
      // When we search anything in search box ex songs then in url there is like
      // "/searchResult/songs" so, searchResult and then query which we search
      // we make state to save what search search/typed.
    }
    // ? is for optional chaining if in event there is undefined,null or any falsy value
    // if we not add optional chaining the in future it will execute key and because
    // of that our app will crash. So optional chaining is for safety purpose.
    // If there is falsy value then because of ? further code will not execute.
  };

  // To handle left category section in mobile view. It will not visible by default
  // It will visible only click mobile menu icon
  const mobileMenuToggle = () => {
    // ! for if mobileMenu is true then it will become false and vice verca.
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];
  // To extract first item of given array.
  // pageName to target page, on which page we are.
  //  filter(Boolean) part is used to remove any empty strings from the resulting array. This is done by passing
  // Boolean as the filter function, which will evaluate each element in the array as a boolean value. Since
  // empty strings ("") are falsy values, they will be removed.

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
      {/* When loading is true then show loader component */}
      {loading && <Loader />}
      <div className="flex h-5 items-center">
        {/* If pageName not equals to video only then render following html/icons. */}
        {pageName !== "video" && (
          <div
            className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={mobileMenuToggle}
          >
            {/* [0.6] for opacity */}
            {mobileMenu ? (
              <CgClose className="text-white text-xl" />
            ) : (
              <SlMenu className="text-white text-xl" />
            )}
            {/* if mobileMenu state true then icon will be CgClose else SlMenu */}
          </div>
        )}
        {/* This <Link> tag we import from "react-router-dom" it is basically
        like anchor tag. When we click on this link tag then it redirect to
        provided url we pass / means homepage url*/}
        <Link to="/" className="flex h-5 items-center">
          <img
            className="h-full hidden dark:md:block"
            src={ytLogo}
            alt="YouTube"
          />
          <img className="h-full md:hidden" src={ytLogoMobile} alt="YouTube" />
          {/* In medium screen it will hidden and logo will be ytLogoMobile */}
        </Link>
      </div>

      {/*search section  */}
      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            {/* hidden in mobile */}
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder="Search"
            value={searchQuery}
          />
          {/* Default value is searchQuery which is state */}
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-white text-xl" />
        </button>
      </div>

      {/* Right icons section */}
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-white text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
          <img
            src="https://xsgames.co/randomusers/assets/avatars/female/69.jpg"
            alt="Profile_Picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
