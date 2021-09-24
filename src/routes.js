// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import AdminPanel from "views/urbit/Adminpanel.js";
import Profile from "views/admin/Profile.js";
import Trouble from "views/admin/Trouble.js";
import ChatFeed from "views/admin/ChatFeed.js";
import Tables from "views/admin/Tables.js";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dns from "@material-ui/icons/Dns";
import FlashOn from "@material-ui/icons/FlashOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import Person from "@material-ui/icons/Person";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import BuildIcon from "@material-ui/icons/Build";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ChatIcon from "@material-ui/icons/Chat";
import VpnKey from "@material-ui/icons/VpnKey";

var routes = [
  {
    path: "/index",
    name: "Ship Activity",
    icon: ListAltIcon,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/admin-panel",
    name: "Admin Panel",
    icon: EmojiObjectsIcon,
    iconColor: "Primary",
    component: AdminPanel,
    layout: "/admin",
  },
  {
    path: "/chat-feed",
    name: "Chat Feed",
    icon: ChatIcon,
    iconColor: "Primary",
    component: ChatFeed,
    layout: "/admin",
  },
  {
    path: "/troubleshooting",
    name: "Troubleshooting",
    icon: BuildIcon,
    iconColor: "Primary",
    component: Trouble,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: Person,
    iconColor: "WarningLight",
    component: Profile,
    layout: "/admin",
  },
  {
    divider: true,
  },
  {
    title: "External Links",
  },
  {
    href: "http://urbitvisor.com",
    name: "Urbit Visor",
    icon: Grain,
  },
  {
    href: "https://dcspark.io",
    name: "dcSpark",
    icon: FlashOn,
  },
  {
    href: "https://github.com/dcSpark/urbit-dashboard",
    name: "Github Repo",
    icon: Dns,
  },
];
export default routes;
