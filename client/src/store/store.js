import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import formSlice from './formSlice';
import productSlice from './productSlice';
import cartSlice from '../redux/cartSlice';


import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1, // Specify the version of your persisted state
  storage, // Use localStorage
  // Only persist certain reducers, or leave empty to persist all
  whitelist: ['auth', 'form', 'product']
};

const rootReducer = combineReducers({
  auth: authSlice,
  form: formSlice,
  product: productSlice,
  cart: cartSlice,
  // Add your slices here
  // Add other reducers here as needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


// Export the store
export default store;
