import {
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

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
        path: "/profile",
        element: <Profile />,
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
