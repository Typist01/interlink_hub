import { User } from "@prisma/client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const UserContext = createContext<{}>({});

type UserPoroviderProps = {
  children: React.ReactNode;
};

// Provider component
export const UserProvider = ({ children }: UserPoroviderProps) => {
  const [currentUser, setCurrentUser] = useState<Omit<User, "password"> | null>(
    null
  );

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData().then((data) => setCurrentUser(data));
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
  fetch("/api/me", { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
