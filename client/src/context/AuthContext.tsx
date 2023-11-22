import React, { useState, useEffect, useContext, createContext } from "react";
import { useToast } from "../interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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
  uid: string | undefined;
};
type Children = { children: React.ReactNode };

// Contexts & Provider
export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

const AuthContextProvider: React.FC<Children> = ({ children }: Children) => {
  const [currentUser, setCurrentUser] = useState<AuthUserType>(
    {} as AuthUserType
  );
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // hooks
  const { toast } = useToast();
  const navigate = useNavigate();

  // function
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      console.log(response);
      setCurrentUser(response.data);
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };

  const singup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", {
        name: name,
        email: email,
        password: password,
      });
      Cookies.set("authId", response.data.token, { secure: true });
      setUid(response.data.token);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/v1/auth/login", {
      email: email,
      password: password,
    });
    Cookies.set("authId", response.data.token, { secure: true });
    setUid(response.data.token);
  };
  const forget = async (email: string) => {
    const response = await axios.post("/api/forget", {
      email: email,
    });
    console.log(response);
  };
  const logout = async () => {
    Cookies.remove("authId");
    setUid("");
  };

  //effects
  useEffect(() => {
    const getUid = () => Cookies.get("authId") as string;
    setUid(getUid());
  }, [uid]);

  const value: AuthContextType = {
    currentUser,
    singup,
    login,
    forget,
    logout,
    isLoading,
    setIsLoading,
    getCurrentUser,
    uid,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
