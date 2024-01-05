import { ReactNode } from "react";
import { authorization } from "@/constants/authorization";
import { authService } from "@/services/auth";
import { useQuery } from "react-query";

type PrivateRouteProps = {
  children: ReactNode;
  pathname: string;
};

const PrivateRoute = ({ pathname, children }: PrivateRouteProps) => {
  const { data: me } = useQuery("me", authService.me, {
    refetchOnWindowFocus: false,
  });

  if (!me || !authorization.userHasRole(pathname, me)) return null;

  return children;
};

export default PrivateRoute;
