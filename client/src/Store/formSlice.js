import { createSlice } from "@reduxjs/toolkit";
import { subCategories, manufacture, socketTypes } from "../AtomicComponents/ForProductForm/Category";

const initialState = {
    selectedMainCategory: "",
    selectedSubCategory: "",
    selectedManufacture: "",
    subCategoryOptions: [subCategories],
    manufactureOptions: [manufacture],
    socketTypeOptions: [socketTypes],

};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setSelectedMainCategory: (state, action) => {
            state.selectedMainCategory = action.payload;
            // Update subcategory options based on the selected main category
            state.subCategoryOptions = subCategories[action.payload] || [];
        },
        setSelectedSubCategory: (state, action) => {
            state.selectedSubCategory = action.payload;
            // Update manufacture options based on the selected subcategory
            state.manufactureOptions = manufacture[action.payload] || [];
        },
        setSelectedManufacture: (state, action) => {
            state.selectedManufacture = action.payload;
            // Update socket type options based on the selected manufacture
            state.socketTypeOptions = socketTypes[action.payload] || [];
        },
        resetForm: (state) => {
            return initialState; // Reset state to initial values
        }
    },
});

export const {
    setSelectedMainCategory,
    setSelectedSubCategory,
    setSelectedManufacture,
    resetForm,
} = formSlice.actions;

export default formSlice.reducer;