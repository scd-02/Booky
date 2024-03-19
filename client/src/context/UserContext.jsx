import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({});

export const UserState = () => {
  return useContext(UserContext);
};

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (!user) {
        axios.get("/api/user/profile").then(({ data }) => {
          setUser(data);
          setReady(true);
        });
      }
    } catch (error) {}
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
