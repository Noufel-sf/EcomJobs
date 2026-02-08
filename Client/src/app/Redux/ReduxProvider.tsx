"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { useGetProfileQuery } from "./Services/AuthApi";
import { setCredentials, setLoading } from "./Slices/AuthSlice";
import { useAppDispatch } from "./hooks";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetProfileQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (data?.user) {
      dispatch(setCredentials({ user: data.user }));
    } else if (isError) {
      dispatch(setLoading(false));
    }
  }, [data, isLoading, isError, dispatch]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
