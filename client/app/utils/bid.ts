"use client";

import { BaseURL } from "./constants";

export const getBids = async (token: string, auctionId: string) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(BaseURL + `/auction/${auctionId}/bids/`, {
      headers,
      cache: "no-cache",
    });
    if (response.ok) {
      const bids = await response.json();
      return bids;
    }
    alert("Failed to fetch bids");
    throw new Error("Failed to fetch bids");
  } catch (error) {
    console.error("Error fetching bids:", error);
    return null;
  }
};

export const createBid = async (token: string, auctionId: string, bid_amount: number) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    const response = await fetch(BaseURL + `/auction/${auctionId}/bids/`, {
      method: "POST",
      headers,
      body: JSON.stringify({bid_amount}),
    });
    if (response.ok) {
      const bid = await response.json();
      return bid;
    }
    alert("Failed to create bid");
    throw new Error("Failed to create bid");
  } catch (error) {
    console.error("Error creating bid:", error);
    return null;
  }
};
