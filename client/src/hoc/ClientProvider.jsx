import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store.js'; // Ensure this is the correct path to your store
import { PersistGate } from 'redux-persist/integration/react'; // Correct import path for PersistGate
import persistStore from 'redux-persist/es/persistStore';

const persistor = persistStore(store); // Create the persistor instance

const ClientProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {/* Pass the persistor instance here */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ClientProvider;

