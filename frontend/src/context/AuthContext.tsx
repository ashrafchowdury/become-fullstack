import React, { useState, useEffect, useContext, createContext } from "react";
import { useToast } from "../interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Types
export type AuthUserType = {
  name: string;
  email: string;
  _id: string;
  phone?: string;
  address?: string;
};
type AuthContextType = {
  currentUser: AuthUserType;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  singup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  forget: (email: string) => void;
  logout: () => void;
  getCurrentUser: (userId: string) => void;
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
  const getCurrentUser = async (userId: string) => {
    try {
      const response = await axios.get("/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      response.status == 200 && setCurrentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const singup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", {
        name: name,
        email: email,
        password: password,
      });
      if (response.status == 201) {
        Cookies.set("authId", response.data.token, { secure: true });
        setUid(response.data.token);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Something went wrong. Try again`,
        variant: "destructive",
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email: email,
        password: password,
      });
      if (response.status == 200) {
        Cookies.set("authId", response.data.token, { secure: true });
        setUid(response.data.token);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Something went wrong. Try again`,
        variant: "destructive",
      });
    }
  };

  const forget = async (email: string) => {
    const response = await axios.post("/api/forget", {
      email: email,
    });
  };

  const logout = async () => {
    try {
      await axios.delete("/api/v1/auth/logout", {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      Cookies.remove("authId");
      setUid("");
    } catch (error) {
      console.log(error);
      toast({
        title: `Something went wrong. Try again`,
        variant: "destructive",
      });
    }
  };

  //effects
  useEffect(() => {
    const getUid = () => Cookies.get("authId") as string;
    const id = getUid();
    if (Boolean(id)) {
      getCurrentUser(id);
    }
    setUid(id);
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
