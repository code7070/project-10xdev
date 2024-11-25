"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "pms-token";

export default function useToken(): [string, (token: string) => void] {
  const [token, setToken] = useState("");

  useEffect(() => {
    const cookieToken = Cookies.get(COOKIE_NAME) || "";
    setToken(cookieToken);
  }, []);

  function doSetToken(token: string) {
    setToken(token);
    Cookies.set(COOKIE_NAME, token, { expires: 1 });
  }

  return [token, doSetToken];
}
