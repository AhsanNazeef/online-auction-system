import { create } from "zustand";
import { getCookie } from "./app/utils/auth";

const initialState = {
    accessToken: "",
    refreshToken: "",
    user: null,
    products: [],
    auctions: [],
};

if (typeof document !== 'undefined') {
    initialState.accessToken = getCookie("access-token") ?? "";
}

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
    setAccessToken: (accessToken: string) => void;
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
