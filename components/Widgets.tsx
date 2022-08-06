import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widgets = () => {
  const [search, setSearch] = useState("saurabhnemade");
  return (
    <div className="hidden lg:block overflow-y-scroll space-y-5 scrollbar-hide">
      <div className="flex space-x-2 text-gray-200 items-center bg-gray-800 rounded-full px-3">
        <HiOutlineSearch size="1.5rem" className="cursor-pointer" />
        <input
          type="text"
          className="outline-none rounded-full bg-transparent p-3"
          placeholder="Search Profile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={search || "saurabhnemade"}
        options={{ height: "80vh" }}
        noBorders
        noScrollbar
        theme="dark"
        key={search}
      />
    </div>
  );
};

export default Widgets;
