import React from "react";
import SideNavigation from "../_components/SideNavigation";

export default function layout({ children }) {
  return (
    <div className="grid md:grid-cols-[16rem_1fr] h-full gap-16 lg:gap-24">
      <SideNavigation />
      <div className=" p-4 md:p-0 transition-all duration-300">{children}</div>
    </div>
  );
}
