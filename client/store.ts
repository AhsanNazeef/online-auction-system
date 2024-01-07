import { create } from "zustand";
import { getCookie } from "./app/utils/auth";

const initialState = {
    accessToken: getCookie('access-token') ,
    refreshToken: getCookie('refresh-token'),
    user: null,
    products: [],
    auctions: [],
};

interface Store {
    accessToken: string | null;
    refreshToken: string | null;
    user: Object | null;
    products: Object[];
    auctions: Object[];
    setUser: (user: Object | null) => void;
    setProducts: (products: Object[] | null) => void;
    setAuctions: (auctions: Object[] | null) => void;
    resetStore: () => void;
}

export const store = create<Store>((set) => ({
    ...initialState,
    setUser: (user: any) => set({ user }),
    setAccessToken: (accessToken: string) => set({ accessToken }),
    setRefreshToken: (refreshToken: string) => set({ refreshToken }),
    setProducts: (products: any) => set({ products }),
    setAuctions: (auctions: any) => set({ auctions }),
    resetStore: () => set({ ...initialState }),
}));
