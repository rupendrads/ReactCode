import React, { createContext, useContext, useState, useEffect } from 'react';
import { backendUrl } from './config';
import { useLocation } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [userid, setUserid] = useState(null);  // Add this line
  const [isLoading, setIsLoading] = useState(true);  // Add this line
  const [error, setError] = useState(null);
  const location = useLocation();
  
  const fetchPermissions = async () => {
    if (location.pathname === '/'){
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${backendUrl}/get-permissions`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setSubscriptionStatus(data.subscription_status);
        setUserid(data.userid);  // Add this line
      } else if (response.status === 401) {
        // Unauthorized. Update your state here
        setSubscriptionStatus(null);
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch permissions");
      }
    } catch (error) {
      setError("Failed to fetch permissions");
      console.error('Failed to fetch permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPermissions();
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ 
      subscriptionStatus,
      userid,  // Add this line 
      fetchPermissions, 
      error,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
