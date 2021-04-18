import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import SignInScreen from "./screens/SignInScreen";

export default function App() {
    return (
        <PaperProvider>
            <StatusBar style="auto" />
            <SignInScreen />
        </PaperProvider>
    );
}
