"use client";

import React, { useEffect } from "react";
import Countdown from "@/app/components/countdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { store } from "@/store";
import { getAuction } from "@/app/utils/auctions";
import Loading from "@/app/loading";
import Link from "next/link";
import { createBid, getBids } from "@/app/utils/bid";

const Auction = ({ params: { id } }: { params: { id: string } }) => {
  const { user, accessToken } = store();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [auction, setAuction] = React.useState<any>(null);
  const [bid, setBid] = React.useState<any>(null);

  const makeBid = async () => {
    if (!accessToken || !user) {
      return alert("You must be logged in to make a bid.");
    }
    let bidAmount = auction.minimum_bid;
    if (bid) bidAmount += bid.bid_amount;
    const bidCreated = await createBid(accessToken, auction.id, bidAmount);
    if (bidCreated) setBid(bidCreated);
  };

  useEffect(() => {
    setLoading(true);
    const get_auction_and_bid = async () => {
      if (!accessToken || !user) {
        return;
      }
      const auction = await getAuction(id, accessToken);
      if (!auction) {
        router.push("/404");
        return;
      }
      setAuction(auction);
      const bids = await getBids(accessToken, auction.id);
      if (bids.results.length > 0) {
        setBid(bids.results[bids.results.length - 1]);
      }
      setLoading(false);
    };
    get_auction_and_bid();
  }, [accessToken, id, router, user]);

  if (!user || !auction || loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16 pt-20">
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link href="/">Home</Link>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link className="capitalize" href="/auctions">
                auctions
              </Link>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link className="capitalize" href="#">
                {auction.product.name}
              </Link>
            </li>
          </ol>
        </div>
      </div>
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {auction.product.images.map((image: any) => {
            return (
              <div
                key={image.id}
                className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                style={{
                  position: "relative",
                  paddingBottom: "100%",
                  height: "0",
                }}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  src={image.image}
                  alt={auction.product.name}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            );
          })}
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {auction.product.name}
            </h2>
            <div className="border-b border-gray-300">
              <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                  Product Details
                </h2>
                <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                  <div className="bg-heading h-0.5 w-full rounded-sm" />
                  <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                </div>
              </header>
              <div>
                <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                  {auction.product.description}
                </div>
              </div>
            </div>
            {
              <div className="border-b border-gray-300">
                {auction.status == "live" && (
                  <Countdown
                    expiry={auction.end_time}
                    text={"Auction Ends In"}
                  />
                )}
                {auction.status == "draft" && (
                  <Countdown
                    expiry={auction.start_time}
                    text={"Auction Starts In"}
                  />
                )}
                {auction.status == "closed" && (
                  <div className="text-heading inline-block pr-2 font-semibold">
                    Auction Closed
                  </div>
                )}
              </div>
            }
            <div className="mt-5 flex items-center ">
              <br />
              <div className=" pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                <span className="font-light ">Minimum Bid: </span>$
                {auction.minimum_bid}.00
              </div>
            </div>
          </div>
          <div className="space-s-4 3xl:pr-48 flex items-center border-b border-gray-300 pb-7  md:pr-32 lg:pr-12 2xl:pr-32">
            <button
              type="button"
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-gray-500"
              onClick={makeBid}
              disabled={
                auction.status != "live" ||
                bid?.bidder.id == (user as { id: string }).id
              }
            >
              Auto Bid
            </button>
          </div>
          <div className="py-6 ">
            <ul className="space-y-5 pb-1 text-sm">
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Highest Bid:
                </span>
                {bid
                  ? `${bid.bidder.first_name} ${bid.bidder.last_name}`
                  : "N/A"}
              </li>
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Value:
                </span>
                <span className="hover:text-heading transition">
                  {bid ? `$${bid.bid_amount}` : "N/A"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
