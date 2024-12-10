import { createContext, useEffect, useState } from "react";

import API_URL from '@/config/api';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  async function getUser() {
    if (token) {

      const res = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    }

  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}