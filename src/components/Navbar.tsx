import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
type Props = {};

const Navbar = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const searchAction = () => {
    //api
    console.log("emflkewnfklew");
  };
  return (
    <div className="grid h-16 w-screen grid-cols-12  items-center  bg-violet-400">
      <div className="col-span-3 col-start-2">LOGO</div>
      <div className="col-span-4">
        <div className="flex w-full flex-row items-center gap-x-2 rounded-lg bg-violet-100 p-2 text-neutral-800 focus:outline">
          <ImSearch
            onClick={searchAction}
            className="cursor-pointer text-violet-900"
          />
          <input
            type="text"
            value={searchText}
            onKeyDown={(e) => {
              if (searchText.length > 0 && e.key === "Enter") {
                searchAction();
              }
            }}
            onChange={(e) => setSearchText(e.currentTarget.value)}
            className="bg-red w-full bg-transparent text-neutral-700 outline-none"
            placeholder="Search"
            required
          />
        </div>
      </div>

      <div className="col-span-4 col-start-11">LOGO</div>
    </div>
  );
};

export default Navbar;
