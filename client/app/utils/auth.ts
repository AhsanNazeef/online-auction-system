'use client'
import { BaseURL } from "./constants";

export const getUserFromToken = async (token: string) => {
  try {
    const response = await fetch(BaseURL + "/auth/users/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      return userData;
    }
    throw new Error("Failed to fetch user data");
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(BaseURL + "/auth/jwt/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (response.ok) {
      const { access: accessToken } = await response.json();
      return accessToken;
    }
    throw new Error("Failed to refresh access token");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

export const getCookie = (name: string) => {
  try {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
