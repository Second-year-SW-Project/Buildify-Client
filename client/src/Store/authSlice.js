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
 * @property {string} profilePicture - URL for the user's profile picture
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
        /**
         * Sets the authenticated user in the state
         * @param {AuthState} state - Current auth state
         * @param {PayloadAction<User>} action - User data payload
         */
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        
        /**
         * Clears the user data from the state
         * @param {AuthState} state - Current auth state
         */
        logout: (state) => {
            state.user = null;
        },
    },
});

// Export actions and reducer
export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
