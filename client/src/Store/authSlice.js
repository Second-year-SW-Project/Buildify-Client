import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} User
 * @property {string} _id - The user's ID
 * @property {string} name - The user's username
 * @property {string} email - The user's email
 * @property {boolean} isVerified - Whether the user is verified
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} address - The user's address
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - The current user or null if not authenticated
 */

// Initial state
const initialState = {
    user: null,
};

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        updateProfilePic: (state, action) => {
            if (state.user) {
                state.user.profilePic = action.payload; // Update profile picture
            }
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

// Export actions and reducer
export const { setAuthUser, updateProfilePic, logout } = authSlice.actions;
export default authSlice.reducer;
