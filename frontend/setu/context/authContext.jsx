import React, { createContext} from 'react';
export const authDataContext = createContext();

const AuthContext = ({ children }) => {
    const serverUrl ='http://localhost:5000';
    const value = {
        serverUrl,
    }
  
  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthContext;