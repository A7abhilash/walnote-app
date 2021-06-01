import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    if (isAuthenticated) {
      const token = await AsyncStorage.getItem("token");
      setAuthToken(token);
      const res = await fetch("http://10.0.2.2:7781/", {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();
      //   console.log(data.user);
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      AsyncStorage.getItem("token").then((data) => {
        // console.log(data);
        setIsAuthenticated(data ? true : false);
      });
    } catch (error) {
      //   console.log(error);
      Alert.alert("Error", "Server error, Please try later.", [{ text: "OK" }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user, loading, setIsAuthenticated, isAuthenticated, authToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
