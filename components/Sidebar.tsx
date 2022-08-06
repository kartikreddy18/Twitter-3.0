import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFeatherAlt } from "react-icons/fa";
import { useMoralis } from "react-moralis";
import { resolve_url } from "../utils/resolve_url";
import { Sidebar_data } from "../utils/sidebar";

type Props = {
  setComponent: Dispatch<SetStateAction<JSX.Element>>;
};

const Sidebar = ({ setComponent }: Props) => {
  const { user, logout } = useMoralis();
  const solAddress = user?.get("solAddress");
  let username = user?.getUsername() || "";
  if (username?.length > 10) {
    username = `${username?.slice(0, 3)}...${username?.slice(-4)}`;
  }
  let image: string = user?.get("pft");
  image = resolve_url(image);
  // console.log(image)
  return (
    <div className="flex flex-col justify-between">
      <div>
        <BsTwitter
          size="2rem"
          className="text-cyan-500 mb-5 cursor-pointer select-none"
        />
        <div>
          {Sidebar_data.map(({ title, Icon, Component }, index) => (
            <div
              key={index}
              className="text-gray-200 flex space-x-2 font-semibold cursor-pointer hover:bg-gray-800 max-w-max p-5 gap-4 rounded-full select-none"
              onClick={() => setComponent(Component)}
            >
              <Icon size="1.7rem" />
              <p className="hidden lg:inline-flex">{title}</p>
            </div>
          ))}
        </div>
        <button
          className="bg-cyan-500 py-3 px-3 md:px-4 rounded-full font-bold flex space-x-3 text-lg hover:bg-cyan-400 mt-5"
          onClick={() => ""}
        >
          <FaFeatherAlt size="1.9rem" />
          <p className="hidden lg:inline-flex">Tweet</p>
        </button>
      </div>
      <div
        className="flex gap-3 cursor-pointer select-none ring rounded-full max-w-max items-center hover:bg-gray-800"
        onClick={logout}
      >
        <Image
          src={image}
          width={50}
          height={50}
          alt=""
          className="rounded-full"
        />
        <p className="hidden lg:grid text-gray-500 pr-2">
          <span className="text-gray-300">{username}</span>
          <span>{solAddress?.slice(0, 3) + "..." + solAddress?.slice(-4)}</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
