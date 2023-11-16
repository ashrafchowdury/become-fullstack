import React, { useState, useEffect, useContext, createContext } from "react";
import { useToast } from "../interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useCookies } from "@/lib/hooks";

// Types
type AuthUserType = {
  name: string;
  email: string;
  _id: string;
};
type AuthContextType = {
  currentUser: AuthUserType;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  singup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  forget: (email: string) => void;
  logout: () => void;
  getCurrentUser: () => void;
};
type Children = { children: React.ReactNode };

// Contexts & Provider
export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

const AuthContextProvider: React.FC<Children> = ({ children }: Children) => {
  const [currentUser, setCurrentUser] = useState<AuthUserType>(
    {} as AuthUserType
  );
  const [isLoading, setIsLoading] = useState(false);

  // hooks
  const { toast } = useToast();
  const navigate = useNavigate();

  // function
  const getCurrentUser = async () => {
    const response = await axios.get("api/user");
    console.log(response);
    // setCurrentUser(response)
  };

  const updateUserProfile = async (data: AuthUserType) => {
    const response = await axios.get("api/user");
    console.log(response);
    // setCurrentUser(response)
  };

  const singup = async (name: string, email: string, password: string) => {
    const response = await axios.post("/api/singup", {
      name: name,
      email: email,
      password: password,
    });
    console.log(response);
  };
  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/login", {
      email: email,
      password: password,
    });
    console.log(response);
  };
  const forget = async (email: string) => {
    const response = await axios.post("/api/forget", {
      email: email,
    });
    console.log(response);
  };
  const logout = async () => {
    const response = await axios.post("/api/forget", {
      id: "",
    });
    console.log(response);
  };

  //effects
  useEffect(() => {}, []);

  const value: AuthContextType = {
    currentUser,
    singup,
    login,
    forget,
    logout,
    isLoading,
    setIsLoading,
    getCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
