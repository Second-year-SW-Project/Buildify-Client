import { createSlice } from "@reduxjs/toolkit";
import { subCategories, manufacture, socketTypes } from "../AtomicComponents/ForAdminForms/Category";

const initialState = {
    selectedMainCategory: "",
    selectedSubCategory: "",
    selectedManufacture: "",
    // selectedFilteredMainCategory: "",
    // selectedFilteredSubCategory: "",
    subCategoryOptions: [subCategories],
    manufactureOptions: [manufacture],
    socketTypeOptions: [socketTypes],

};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        // setSelectedFilterMainCategory: (state, action) => {
        //     state.selectedFilteredMainCategory = action.payload;
        //     // Update subcategory options based on the selected main category
        //     state.subCategoryOptions = subCategories[action.payload] || [];
        // },
        // setSelectedFilterSubCategory: (state, action) => {
        //     state.selectedFilteredSubCategory = action.payload;
        //     // Update manufacture options based on the selected subcategory
        //     state.manufactureOptions = manufacture[action.payload] || [];
        // },
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
            state = initialState; // Reset state to initial values
        }
    },
});

export const {
    setSelectedMainCategory,
    setSelectedSubCategory,
    setSelectedManufacture,
    // setSelectedFilterMainCategory,
    // setSelectedFilterSubCategory,
    resetForm,
} = formSlice.actions;

export default formSlice.reducer;