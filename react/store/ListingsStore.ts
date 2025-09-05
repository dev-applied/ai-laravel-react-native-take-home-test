import {create} from "zustand";
import {Property} from "@/types/property";

export interface ListingsStore {
    title: string | null;
    setTitle: (state: string | null) => void;
    search: string;
    setSearch: (state: string) => void;
    listings: Property[];
    setListings: (state: Property[]) => void;
    wishLists: Property[];
    setWishLists: (state: Property[]) => void;
}

const useListingsStore = create<ListingsStore>()(
    (set, get) => ({
        title: null,
        setTitle: (state: string | null) => {
            set({title: state});
        },
        search: '',
        setSearch: (state: string) => {
            set({search: state});
        },
        listings: [],
        setListings: (state: Property[]) => {
            set({listings: state});
        },
        wishLists: [],
        setWishLists: (state: Property[]) => {
            set({wishLists: state});
        }
    }),
);

export default useListingsStore;
