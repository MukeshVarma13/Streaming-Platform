import { BiCategory } from "react-icons/bi";
import { IoGameControllerOutline, IoVideocamOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdOutlineHome } from "react-icons/md";
import { PiVideo } from "react-icons/pi";

export const navbarItems = [
  {
    icons: <MdOutlineHome size={22} />,
    name: "Home",
    link: "/",
  },
  {
    icons: <BiCategory size={22} />,
    name: "Categories",
    link: "/categories",
  },
  {
    icons: <IoVideocamOutline size={22} />,
    name: "Streams",
    link: "/streams",
  },
  {
    icons: <PiVideo size={22} />,
    name: "Following",
    link: "/",
  },
  {
    icons: <LiaUserFriendsSolid size={22} />,
    name: "Friends",
    link: "/",
  },
  {
    icons: <IoGameControllerOutline size={22} />,
    name: "Gaming",
    link: "/",
  },
];
