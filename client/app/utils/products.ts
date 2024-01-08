"use client";

import { BaseURL } from "./constants";

export const getProducts = async (token: string, query: string) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(BaseURL + `/products/?${query}`, {
      headers,
      cache: "no-store",
    });
    if (response.ok) {
      const products = await response.json();
      return products;
    }
    throw new Error("Failed to fetch products");
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProduct = async (id: string, token: string) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(BaseURL + `/products/${id}`, {
      headers,
      cache: "no-store",
    });
    if (response.ok) {
      const product = await response.json();
      return product;
    }
    throw new Error("Failed to fetch product");
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const createProduct = async (token: string, product: any) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    const response = await fetch(BaseURL + `/products/`, {
      method: "POST",
      headers,
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const product = await response.json();
      return product;
    }
    alert("Failed to create product");
    throw new Error("Failed to create product");
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

export const createProductImage = async (
  token: string,
  productId: string,
  image: string
) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    const response = await fetch(BaseURL + `/products/${productId}/images/`, {
      method: "POST",
      headers,
      body: JSON.stringify({ image }),
    });
    if (response.ok) {
      const image = await response.json();
      return image;
    }
    alert("Failed to create product image");
    throw new Error("Failed to create product image");
  } catch (error) {
    console.error("Error creating product image:", error);
    return null;
  }
};
