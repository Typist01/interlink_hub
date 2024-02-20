import { User } from "@prisma/client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const UserContext = createContext<{}>({});

type UserPoroviderProps = {
  children: React.ReactNode;
};

// Provider component
export type UserModel = Omit<User, "password">;
export const UserProvider = ({ children }: UserPoroviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

  useEffect(() => {
    // Fetch user data when the component mounts

    fetchUserData().then((data) => {
      if (data) {
        setCurrentUser(data);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Fetch user data function
async function fetchUserData() {
  // Implementation from the previous step
  const response = await fetch("/api/me", { method: "GET" });
  const data = await response.json();
  return data;
}

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
