"use client";
import { Loading } from "@/components/Loading/Loading";
import { useUserSession } from "@/hooks/useUserSession/useUserSession";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";

// Create a context
export const UserContext = createContext<{
  user: UserModel | undefined | null;
  refreshUser: () => void;
  logout: () => void;
}>({
  user: undefined,
  refreshUser: () => {},
  logout: () => {},
});

type UserPoroviderProps = {
  children: React.ReactNode;
};

// Provider component
export type UserModel = Omit<User, "password" | "created" | "updated"> & {
  created: string;
  updated: string;
};

export const UserProvider = ({ children }: UserPoroviderProps) => {
  const { getSession } = useUserSession();
  const [user, setUser] = useState<UserModel | undefined | null>(undefined);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const refreshUser = () => setRefreshCounter((c) => c + 1);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getSession(setUser, setIsLoading);
  }, [getSession, setUser, refreshCounter]);

  useEffect(() => {
    if (
      user &&
      user.verified !== true &&
      pathname !== "/verify" &&
      pathname !== "/complete-profile" &&
      !pathname.includes("/verify-user")
    ) {
      setTimeout(() => router.replace("/verify"), 0);
    } else if (
      user &&
      user.verified &&
      !user?.name &&
      pathname !== "/complete-profile" &&
      pathname !== "/welcome"
    ) {
      setTimeout(() => router.replace("/complete-profile"), 0);
    }
  }, [user, router, pathname]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-5">
        <Loading />
      </div>
    );
  }

  const logout = async () => {
    const result = await fetch("/api/logout", { method: "POST" });
    if (result.ok) {
      toast("Logged out");
      refreshUser();
      setTimeout(() => {
        router.push("/");
      }, 200);
    } else {
      toast.error("Logout failed");
    }
  };

  return (
    <UserContext.Provider value={{ user, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);
