"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "../loading";
import { store } from "@/store";
import { useRouter } from "next/navigation";
import { getAuctions } from "../utils/auctions";

interface Auction {
  results: any[];
  count: number;
  next: string;
  previous?: string;
}

const Auction = () => {
  const { user, accessToken } = store();
  const [auctions, setAuctions] = React.useState<Auction | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [status, setStatus] = React.useState("live");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [query, setQuery] = React.useState("page=1&search=''&status=live");

  useEffect(() => {
    setQuery(`page=${page}&status=${status}&search=${search}`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [status, page, search]);

  useEffect(() => {
    setLoading(true);
    const get_auctions = async () => {
      if (!accessToken || !user) {
        return;
      }
      const auctions = await getAuctions(accessToken, query);
      console.log(auctions)
      setAuctions(auctions);
      setLoading(false);
    };
    get_auctions();
  }, [accessToken, router, user, query]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-7xl px-2 pt-5">
      <div className="flex flex-col space-y-8 pt-20">
        <p className="text-3xl font-bold text-green-500 md:text-5xl md:leading-10">
          Auctions
        </p>
        <p className="max-w-4xl text-base text-gray-600 md:text-xl">
          These are all of auctions of products.
        </p>
        <div className="mt-6 flex w-full items-center space-x-2 md:w-2/3">
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search Topics"
          ></input>
          <button
            type="button"
            onClick={() => {
              setPage(1);
              setSearch(searchQuery);
            }}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setPage(1);
              setSearchQuery("");
              setSearch("");
            }}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black text-nowrap"
          >
            Clear Search
          </button>
          <Link
            type="button"
            href="/auctions/new"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black text-nowrap"
          >
            Create New Auction
          </Link>
        </div>
    
      </div>
      <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
        <div className="flex w-full items-end border-b border-gray-300">
          {["Live", "Draft", "Closed"].map((filter, index) => (
            <div
              className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700  ${
                status == filter.toLowerCase() && "border-b-2 border-black"
              }`}
              key={filter}
              onClick={() => {
                setPage(1);
                setStatus(filter.toLowerCase());
              }}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : auctions?.results.length ? (
        <>
          <div className="grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
            {auctions.results.map((post: any) => (
              <div key={post.id} className="border">
                {post.product.images[0]?.image ? (
                  <Image
                    src={post.product.images[0]?.image}
                    className="aspect-video w-full rounded-md"
                    alt=""
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={
                      "https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"
                    }
                    className="aspect-video w-full rounded-md"
                    alt=""
                    width={100}
                    height={100}
                    priority={true}
                  />
                )}
                <div className="min-h-min p-3">
                  <p className="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
                    {post.product.name}
                  </p>
                  <p className="mt-4 flex-1 text-base font-semibold text-gray-900">
                    {post.product.title}
                  </p>
                  <p className="mt-4 w-full text-sm leading-normal text-gray-600 h-20">
                    {post.description}
                  </p>
                  {
                    <Link
                      href={`/auctions/${post.id}`}
                      type="button"
                      className={`center text-center w-maxinline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 ${
                        post.status == "live" &&
                        "pointer-events-none bg-slate-500"
                      }`}
                    >
                      View Auction
                    </Link>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-gray-300">
            <div className="mt-2 flex items-center justify-between">
              <div className="hidden md:block">
                <p>
                  showing <strong>{10 * page - 10 + 1}</strong> to{" "}
                  <strong>{10 * page - 10 + auctions.results.length}</strong> of{" "}
                  <strong>{auctions.count}</strong> results
                </p>
              </div>
              <div className="space-x-2">
                <button
                  type="button"
                  disabled={!auctions?.previous}
                  onClick={() => setPage(page - 1)}
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-slate-500"
                >
                  &larr; Previous
                </button>
                <button
                  type="button"
                  disabled={!auctions?.next}
                  onClick={() => setPage(page + 1)}
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-slate-500"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-60 text-xl">
          No auctions to show
        </div>
      )}
    </div>
  );
};

export default Auction;
