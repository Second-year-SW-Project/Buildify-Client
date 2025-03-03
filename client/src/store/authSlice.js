import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} User
 * @property {string} _id - The user's ID
 * @property {string} name - The user's username
 * @property {string} email - The user's email
 * @property {boolean} isVerified - Whether the user is verified
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - The current user or null if not authenticated
 */

// Define the initial state with a user object set to null initially
const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set the user data
        setAuthUser: (state, action) => {
            state.user = action.payload; // Set the user data to the state
        },
    },
});

// Export the action and reducer
export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
