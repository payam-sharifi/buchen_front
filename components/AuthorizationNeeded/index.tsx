"use client";
import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";

export const AuthorizationNeeded = ({ children }: { children: ReactNode }) => {
  // const token = useAppSelector((state) => state.sessionSlice.tokenPmlm);

  if (false) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};

export const useIsAutenticated = () => {
  // const token = useAppSelector((state) => state.sessionSlice.tokenPmlm);

  if (false) {
    return true;
  } else {
    return false;
  }
};
