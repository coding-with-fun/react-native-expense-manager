import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./screens/AuthScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
    const Stack = createStackNavigator();

    return (
        <PaperProvider>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Sign In">
                        {(props) => (
                            <AuthScreen {...props} screenName={"Sign In"} />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name="Sign Up">
                        {(props) => (
                            <AuthScreen {...props} screenName={"Sign Up"} />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
