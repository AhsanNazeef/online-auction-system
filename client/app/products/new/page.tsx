"use client";

import React from "react";
import { ArrowRight, Plus } from "lucide-react";
import { store } from "@/store";
import { createProduct, createProductImage } from "@/app/utils/products";
import Image from "next/image";
import Loading from "@/app/loading";
import Logo from "@/public/logo.svg";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const { user, accessToken } = store();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [images, setImages] = React.useState<string[]>([""]);
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();

  const submit = async (event: React.FormEvent) => {
    if (!accessToken || !user) {
      return alert("You must be logged in to create a product.");
    }
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await createProduct(accessToken, { name, description });

    if (res) {
      images.map(async (image) => {
        await createProductImage(accessToken, res.id, image);
      });
      return router.push(`/products`);
    }
    setError("Something went wrong");
    setSubmitting(false);
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
        <div className="mb-2 flex justify-center pt-20">
          <Image src={Logo} alt="logo" className="w-12" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Add the product
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
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
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
              {images.map((image, index) => {
                return (
                  <input
                    key={index}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                    type="text"
                    placeholder="Image Link"
                    onChange={(e) => {
                      const newImages = [...images];
                      newImages[index] = e.target.value;
                      setImages(newImages);
                    }}
                    value={image}
                    required
                  ></input>
                );
              })}

              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:bg-slate-500"
                onClick={() => setImages([...images, ""])}
              >
                Add More Image <Plus className="ml-2" size={16} />
              </button>
            </div>
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

export default AddProduct;
