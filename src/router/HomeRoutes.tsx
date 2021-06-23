import { Home } from "../components/pages/Home";
import { UserManagement } from "../components/pages/UserManagement";
import { Todos } from "../components/pages/Todos";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "/user_management",
    exact: false,
    children: <UserManagement />
  },
  {
    path: "/todos",
    exact: false,
    children: <Todos />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
