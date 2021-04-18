import React, { useRef } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

const AuthScreen = ({ navigation, screenName }) => {
    const ref_password_input = useRef();
    const ref_confirm_password_input = useRef();

    const handleChangeScreen = () => {
        navigation.replace(screenName === "Sign Up" ? "Sign In" : "Sign Up");
    };

    const handleAuthUser = () => {
        console.log("object");
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps={"handled"}
            >
                <View style={styles.bodyContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoFocus
                            label="Email"
                            mode="outlined"
                            keyboardType="email-address"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                ref_password_input.current.focus()
                            }
                            style={styles.input}
                        />

                        <TextInput
                            secureTextEntry
                            label="Password"
                            mode="outlined"
                            autoCompleteType="password"
                            textContentType="password"
                            autoCapitalize="none"
                            ref={ref_password_input}
                            returnKeyType={
                                screenName === "Sign Up" ? "next" : "default"
                            }
                            onSubmitEditing={() =>
                                screenName === "Sign Up"
                                    ? ref_confirm_password_input.current.focus()
                                    : null
                            }
                            style={styles.input}
                        />

                        {screenName === "Sign Up" && (
                            <TextInput
                                secureTextEntry
                                label="Confirm Password"
                                mode="outlined"
                                autoCompleteType="password"
                                textContentType="password"
                                autoCapitalize="none"
                                ref={ref_confirm_password_input}
                                style={styles.input}
                            />
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        {screenName === "Sign In" && (
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    handleAuthUser();
                                }}
                            >
                                Sign In
                            </Button>
                        )}
                        <Button
                            mode={
                                screenName === "Sign In"
                                    ? "outlined"
                                    : "contained"
                            }
                            style={styles.button}
                            onPress={() => {
                                screenName === "Sign In"
                                    ? handleChangeScreen()
                                    : handleAuthUser();
                            }}
                        >
                            Sign Up
                        </Button>
                        {screenName === "Sign Up" && (
                            <Button
                                mode="outlined"
                                style={styles.button}
                                onPress={() => {
                                    handleChangeScreen();
                                }}
                            >
                                Sign In
                            </Button>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        marginTop: 100,
    },
    bodyContainer: {
        alignItems: "center",
    },
    inputContainer: {
        width: 300,
    },
    input: {
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "73%",
    },
    button: {
        width: 135,
    },
});
