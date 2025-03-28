import React from "react";
import SideContent from "./SideContent";
import menu from "../assets/menu.png";


function Sidebar() {
  return (
    <div className="lg:drawer-open z-20">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col fixed mt-3.5 right-1">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <img src={menu} className="w-8 cursor-pointer" />
        </label>
      </div>
      <div className="drawer-side scrollbar-hidden">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-[#080b2a] h-[92vh] md:min-h-full w-80 lg:w-96 p-4">
          <SideContent />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
