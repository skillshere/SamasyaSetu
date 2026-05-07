import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from './authContext'; 

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(serverUrl + '/api/auth/getCurrentUser', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('getCurrentUser response:', res.data);
      setUserData(res.data);
    } catch (error) {
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;