"use client";

import { BaseURL } from "./constants";

export const getAuctions = async (token: string, query: string) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(BaseURL + `/auction/?${query}`, { headers, cache: "no-cache" });
    if (response.ok) {
      const auctions = await response.json();
      return auctions;
    }
    alert("Failed to fetch auctions");
    throw new Error("Failed to fetch auctions");
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return null;
  }
};

export const getAuction = async (id: string, token: string) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(BaseURL + `/auction/${id}`, { headers });
    if (response.ok) {
      const auction = await response.json();
      return auction;
    }
    alert("Failed to fetch auction");
    throw new Error("Failed to fetch auction");
  } catch (error) {
    console.error("Error fetching auction:", error);
    return null;
  }
};

export const createAuction = async (token: string, auction: any) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    const response = await fetch(BaseURL + "/auction/", {
      method: "POST",
      headers,
      body: JSON.stringify({product: auction.product, minimum_bid: auction.minimumBid, start_time: auction.startTime, end_time: auction.endTime}),
    });
    if (response.ok) {
      const auction = await response.json();
      return auction;
    }
    alert("Failed to create auction");
    throw new Error("Failed to create auction");
  } catch (error) {
    console.error("Error creating auction:", error);
    return null;
  }
}
