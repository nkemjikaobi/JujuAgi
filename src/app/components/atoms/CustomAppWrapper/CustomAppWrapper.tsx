import { GET_USER } from "@/app/graphql/auth/queries";
import { LocalStorageKeys } from "@/app/libs/helpers";
import { updateCurrentUser } from "@/app/store/auth";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Logo from "../Logo/Logo";

const CustomAppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loopCount, setLoopCount] = useState(0);

  const { data, error, loading: fetchingUserDetails } = useQuery(GET_USER);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const authKeyPaths = ["dashboard", "payment", "reserve"];
  const userIsInSecuredPath = authKeyPaths.find((path) => pathname.includes(path.replaceAll("/", "")) && !pathname.includes("auth"));

  const logout = () => {
    const redirectPath = `${pathname}`;

    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.EXPIRATION_TIME);
    localStorage.removeItem(LocalStorageKeys.CUSTOMER_EMAIL);
    localStorage.removeItem(LocalStorageKeys.FORGOT_CUSTOMER_EMAIL);

    dispatch(updateCurrentUser({}));

    if (userIsInSecuredPath) router.push(`/?rdr=${redirectPath}`);
  };

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.TOKEN);
    const tokenExpirationTime = localStorage.getItem(LocalStorageKeys.EXPIRATION_TIME);

    if (token && moment() > moment(tokenExpirationTime)) logout();
    if (!token && userIsInSecuredPath) logout();

    setTimeout(() => {
      setLoopCount(loopCount + 1);
    }, 1000);

    // eslint-disable-next-line
  }, [loopCount]);

  useEffect(() => {
    if (data?.me?.data) {
      dispatch(updateCurrentUser(data?.me?.data));
    } else if (error) logout();

    // eslint-disable-next-line
  }, [data, error]);

  if (fetchingUserDetails)
    return (
      <div className="w-screen h-screen flex items-center justify-center animate-pulse">
        <Logo theme="dark" />
      </div>
    );

  return <>{children}</>;
};

export default CustomAppWrapper;
