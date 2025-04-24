// src/store/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: "",
    content: "",
    mainCategory: "",
    subCategory: "",
    manufacture: "",
    socketType: "",
    tdp: 0,
    cores: 0,
    threads: 0,
    baseClock: 0,
    boostClock: 0,
    integratedGraphics: false,
    includesCooler: false,
    memoryType: "",
    memoryCapacity: 0,
    memorySpeed: 0,
    quantity: 0,
    price: 0,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetProduct: () => initialState,
    },
});

export const { updateProduct, resetProduct } = productSlice.actions;
export default productSlice.reducer;