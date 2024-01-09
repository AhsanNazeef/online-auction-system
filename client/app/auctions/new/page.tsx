"use client";

import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { store } from "@/store";
import {
  createProduct,
  getProducts,
} from "@/app/utils/products";
import Image from "next/image";
import Loading from "@/app/loading";
import Logo from "@/public/logo.svg";
import { useRouter } from "next/navigation";
import { createAuction } from "@/app/utils/auctions";

interface Products {
  results: any[];
  count: number;
  next: string;
  previous?: string;
}

const CreateNewAuction = () => {
  const { user, accessToken } = store();
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [minimumBid, setMinimumBid] = React.useState("");
  const [products, setProducts] = React.useState<Products | null>(null);
  const [product, setProduct] = React.useState<any>(null);
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [query, setQuery] = React.useState("page=1&search=''&status=draft");
  const router = useRouter();

  useEffect(() => {
    setQuery(`page=${page}&status=draft&search=${search}`);
  }, [page, search]);

  useEffect(() => {
    setLoading(true);
    const get_products = async () => {
      if (!accessToken || !user) {
        return;
      }
      const products = await getProducts(accessToken, query);
      setProducts(products);
      setProduct(products.results[0] ?? null)
      setLoading(false);
    };
    get_products();
  }, [accessToken, router, user, query]);

  const submit = async (event: React.FormEvent) => {
    if (!accessToken || !user) {
      return alert("You must be logged in to create a product.");
    }
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await createAuction(accessToken, { minimumBid, startTime, endTime, product: product.id });
    if (res) {
      alert("Auction created successfully")
      return router.push(`/auctions`);
    }
    setError("Something went wrong");
    setSubmitting(false);
  };

  if (!user || !products) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
        <div className="mb-2 flex justify-center pt-20">
          <Image src={Logo} alt="logo" className="w-12" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Add New Auction
        </h2>
        <form className="mt-8" onSubmit={submit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Product{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="search product"
                  value={search}
                  required
                  onChange={(e) => setSearch(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <select
                required
                value={product && product.name}
                onChange={(e) => setProduct(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {products.results.map((product) => {
                  return <option value={product} key={product.id}> {product.name ?? ""}</option>;
                })}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Start Time{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="datetime-local"
                  placeholder="Description"
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                  required
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  End Time{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="datetime-local"
                  placeholder="Description"
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                  required
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Minimum Bid{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="number"
                  min="1"
                  placeholder="minimum bid"
                  onChange={(e) => setMinimumBid(e.target.value)}
                  value={minimumBid}
                  required
                ></input>
              </div>
            </div>
            {error && (
              <div className="w-full text-nowrap">
                <label htmlFor="" className="text-red-500">
                  {error}
                </label>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:bg-slate-500"
                disabled={submitting}
              >
                Create <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewAuction;
