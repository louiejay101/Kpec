import {
  HomeIcon,
  PaperClipIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { PaperAirplaneIcon, ServerStackIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { element } from "prop-types";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "GL Accounts",
        path: "/glaccount",
        element: <Profile />,
      },
      {
        icon: <Square3Stack3DIcon {...icon} />,
        name: "PNL Statement",
        path: "/table",
        element: <Tables />,
      },
    ],
  },
  {
    layout: "auth", // 👈 This block was missing!
    pages: [
      {
        path: "sign-in", // Note: no leading slash here
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
