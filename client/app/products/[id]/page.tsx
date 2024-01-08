"use client";

import React, { useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Share } from "lucide-react";
import { store } from "@/store";
import { getProduct } from "@/app/utils/products";
import Image from "next/image";
import Loading from "@/app/loading";
import Link from "next/link";
import LoginForm from "@/app/components/loginForm";
import Logo from "@/public/logo.svg";
import { useRouter } from "next/navigation";
import { BaseURL } from "@/app/utils/constants";

interface Product {
  id: string;
  name: string;
  description: string;
  status: "draft" | "live" | "sold" | "delivered";
  images?: string[];
  created_at: string;
  updated_at: string;
}

const Product = ({ params: { id } }: { params: any }) => {
  const { user, accessToken, setAccessToken } = store();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const get_product = async () => {
      setLoading(true);
      if (!accessToken || !user) {
        return;
      }
      const product = await getProduct(id, accessToken);
      setName(product.name);
      setDescription(product.description);
      setProduct(product);
      setLoading(false);
    };
    get_product();
  }, [accessToken, user, id]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch(BaseURL + `/products/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      return router.push(`/products`)
    }
    setError("Something went wrong"); 
    setSubmitting(false);
  }

  if (!product) {
    return <Loading />
  }

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
      <div className="mb-2 flex justify-center pt-20">
        <Image src={Logo} alt="logo" className="w-12" />
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight text-black">
        Edit the product
      </h2>
      <form className="mt-8" onSubmit={submit}>
      <div className="space-y-5">
        <div>
          <label htmlFor="" className="text-base font-medium text-gray-900">
            {" "}
            Name{" "}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-base font-medium text-gray-900">
              {" "}
              Description{" "}
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
            Update <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </div>
    </form>
    </div>
  </div>
  );
};

export default Product;
