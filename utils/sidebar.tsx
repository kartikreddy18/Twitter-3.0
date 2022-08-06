import { HiHome, HiUser, HiCog } from "react-icons/hi";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

export const Sidebar_data = [
  {
    title: "Home",
    Icon: HiHome,
    Component: Home,
  },
  {
    title: "Profile",
    Icon: HiUser,
    Component: Profile,
  },
  {
    title: "Settings",
    Icon: HiCog,
    Component: Settings,
  },
];
