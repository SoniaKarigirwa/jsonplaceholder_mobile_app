import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../lib/jsonplaceholder";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = 1; // Replace with the actual user ID you want to fetch
    getUserById(userId)
      .then((res) => {
        if (res) {
          // Map the response to only include the desired properties
          const mappedUser = {
            id: res.id,
            username: res.username,
            email: res.email,
            password: "", // Add a default or empty password
          };
          setIsLogged(true);
          setUser(mappedUser);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
