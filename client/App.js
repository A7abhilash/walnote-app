import React from "react";
import AppNavigator from "./src/AppNavigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { MsgProvider } from "./src/contexts/MsgContext";

export default function App() {
  return (
    <AuthProvider>
      <MsgProvider>
        <AppNavigator />
      </MsgProvider>
    </AuthProvider>
  );
}
