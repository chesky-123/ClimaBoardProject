import React, { createContext, useState } from 'react';
type UserContextType = {
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

  const login = (name: string) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    setUserName(null);
  };

  return (
    <UserContext value={{ userName, login, logout }}>
      {children}
    </UserContext>
    
  );
}