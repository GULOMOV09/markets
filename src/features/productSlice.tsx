import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

//Api call

export const fetchProductsData = createAsyncThunk(
    "products/fetchProductsData",

    async ({ limit, skip, type }: any) => {
        console.log(type, "asas");

        if (type == "search") {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/search?q=${limit}`);
            return response.data;
        } else if (type == "harflar") {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}?limit=${limit}&skip=${skip}&sortBy=title&order=asc`);
            return response.data;
        } else if (type == "narxi") {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}?limit=${limit}&skip=${skip}&sortBy=price&order=asc`);
            return response.data;
        } else {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}?limit=${limit}&skip=${skip}&total=100`);
            return response.data;
        }
    }
);

//End Api call

export interface ProductsState {
    data: any;
    korzinka: any;
    loading: boolean;
    error: boolean;
}

const initialState: ProductsState = {
    data: [],
    korzinka: [],
    loading: false,
    error: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addToKorzinka: (state, action) => {
            const newItem = action.payload;
            const index = state.korzinka.findIndex((item: any) => item.id === newItem.id);

            if (index !== -1) {
                state.korzinka[index].amount += 1;
            } else {
                state.korzinka = [...state.korzinka, { ...newItem, amount: 1 }];
            }
        },
        deleteFromKorzina: (state, action) => {
            const deleteProduct = action.payload;
            console.log(action.payload, "5555");
            state.korzinka = state.korzinka.filter((item: any) => item.id !== deleteProduct);
        },
        amountPlusProduct: (state, action) => {
            const newItem = action.payload;
            const index = state.korzinka.findIndex((item: any) => item.id === newItem.id);

            if (index !== -1) {
                state.korzinka[index].amount += 1;
            }
        },
        amountMinusProduct: (state, action) => {
            const newItem = action.payload;
            const index = state.korzinka.findIndex((item: any) => item.id === newItem.id);
            if (index !== -1) {
                state.korzinka[index].amount = Math.max(state.korzinka[index].amount - 1, 0);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductsData.rejected, (state) => {
                state.error = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { addToKorzinka, deleteFromKorzina, amountPlusProduct, amountMinusProduct } = productSlice.actions;

export const selectedAllProducts = (state: RootState) => state.products.data.products;
export const selectedAllCount = (state: RootState) => state.products.data.total;
export const selectedAllKorzinka = (state: RootState) => state.products.korzinka;
export const selectedLoading = (state: RootState) => state.products.loading;
export const selectedError = (state: RootState) => state.products.error;

export default productSlice.reducer;
