import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables, useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { showToast } from "../components/atoms/ShowToast/showToast";
import { LOGIN_USER } from "../graphql/auth/mutations";
import { LocalStorageKeys, NotificationTypes, getTokenExpirationTime } from "../libs/helpers";
import { updateCurrentUser } from "../store/auth";

interface LoginSuccessData {
  data: {
    token: string;
    user: {
      email: string;
      phoneNumber: string;
      firstName: string;
      lastName: string;
      _id: string;
    };
  };
  status: "success";
  message: string;
}

interface LoginFailureData {
  status: "error";
  message: string;
}

type loginProps = MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined;

interface useLoginMutationProps {
  login: (options?: loginProps) => void;
  isLoading: boolean;
}

const useLoginMutation = (): useLoginMutationProps => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLoginSuccessDestination = "/dashboard/home";

  const router = useRouter();
  const dispatch = useDispatch();

  const [loginMutation, { data, error, client }] = useMutation(LOGIN_USER);

  const { loginUser }: { loginUser: LoginSuccessData | LoginFailureData } = data || {};

  const searchParams = useSearchParams();

  const login = (value: loginProps) => {
    setIsLoading(true);
    loginMutation(value);
  };

  useEffect(() => {
    if (loginUser && loginUser.status === "success") {
      client.resetStore();

      const rdr = searchParams.get("rdr");

      const loginDestination = `${rdr}`;

      localStorage.setItem(LocalStorageKeys.TOKEN, loginUser.data.token);
      localStorage.setItem(LocalStorageKeys.EXPIRATION_TIME, String(getTokenExpirationTime()));

      dispatch(updateCurrentUser(loginUser.data.user));
      showToast("Login Success", NotificationTypes.SUCCESS);
      localStorage.removeItem(LocalStorageKeys.CUSTOMER_EMAIL);
      localStorage.removeItem(LocalStorageKeys.FORGOT_CUSTOMER_EMAIL);
      router.push(rdr ? loginDestination : onLoginSuccessDestination);
    } else if (loginUser && loginUser.status === "error") {
      setIsLoading(false);
      showToast(loginUser.message, NotificationTypes.ERROR);
      if (loginUser.message === "Account is not verified.") router.push("/auth/verify-email");
    }
    if (error) {
      setIsLoading(false);
      showToast("Failed to login, please check your network.", NotificationTypes.ERROR);
    }
    // eslint-disable-next-line
  }, [data, error]);

  return { login, isLoading };
};

export default useLoginMutation;
