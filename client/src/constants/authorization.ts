import { Me } from "./../services/auth/types";
import { APP_ROUTES } from "./app-routes";
import Cookies from "js-cookie";

type Token = {
  email: string;
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  role: string;
  unique_name: string;
};

const checkIsPrivateRoute = (pathname: string) => {
  const isPrivate = APP_ROUTES.private.some((route) => {
    if (route.name.includes(":")) {
      const pattern = new RegExp(
        `^${route.name.replace(/:[a-zA-Z0-9-]+/, "[a-zA-Z0-9-]+")}$`,
      );
      return pattern.test(pathname);
    } else {
      return route.name === pathname;
    }
  });

  return isPrivate;
};

const isUserAuthenticated = () => {
  if (typeof window !== "undefined") {
    const userToken = Cookies.get("token");

    return !!userToken;
  }
};

const userHasRole = (pathname: string, user: Me) => {
  const currentRoute = APP_ROUTES.private.find((route) => {
    const isDynamicRoute = /\/:[a-zA-Z]+/.test(route.name);

    if (isDynamicRoute) {
      const routeRegex = new RegExp(
        `^${route.name.replace(/\/:[a-zA-Z]+/g, "/[a-zA-Z0-9-]+")}$`,
      );
      return routeRegex.test(pathname);
    }

    return route.name === pathname;
  });

  return currentRoute?.roles.some((role) => user.roles.includes(role));
};

const readJWTtoken = (token: string | null) => {
  if (token) return JSON.parse(window.atob(token.split(".")[1])) as Token;

  return null;
};

export const authorization = {
  checkIsPrivateRoute,
  isUserAuthenticated,
  userHasRole,
  readJWTtoken,
};
