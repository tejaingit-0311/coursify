import { adminSignout } from "@/api/adminApi";
import { userSignout } from "@/api/userApi";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContextType, User } from "../types/auth";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("authUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: 'admin' | 'user', userData?: any) => {
    const authData: User = { 
      id: userData?.id || 'temp-id',
      email: userData?.email || '',
      role,
      token: userData?.token || ''
    };
    // console.log(authData);
    localStorage.setItem("authUser", JSON.stringify(authData));
    setUser(authData);
  };

  const logout = async (role: string) => {
    // console.log("inisde logout()");
    try{
      const response =  ( role === "user" ? await userSignout() : await adminSignout() ) ;
      setIsLoading(true);
      console.log(response);
      localStorage.removeItem("authUser");
      setUser(null);
      // console.log(user);
      toast.success(response.data.data.message);
      setIsLoading(false);
    }catch(error){
      console.log(error);
      
    }finally{
      setIsLoading(false);
    }
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};