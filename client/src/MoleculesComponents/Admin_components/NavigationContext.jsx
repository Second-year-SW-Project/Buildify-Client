import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [isOrderViewVisible, setIsOrderViewVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedTab, setSelectedTab] = useState('');

    const showOrderView = (id) => {
        setSelectedOrderId(id);
        setIsOrderViewVisible(true);
    };

    return (
        <NavigationContext.Provider value={{
            showOrderView,
            selectedOrderId,
            selectedTab,
            setSelectedTab
        }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}; 