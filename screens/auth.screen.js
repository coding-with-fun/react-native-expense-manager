import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import {
    checkPassword,
    comparePassword,
    validateEmail,
} from "../utils/validateData";

const AuthScreen = ({ navigation, screenName }) => {
    const initialState = {
        userEmail: "",
        userEmailError: false,
        userPassword: "",
        userPasswordError: false,
        showUserPasswordHint: false,
        userConfirmPassword: "",
        userConfirmPasswordError: false,
    };
    const [userData, setUserData] = useState(initialState);

    const ref_password_input = useRef();
    const ref_confirm_password_input = useRef();

    // TODO: Add condition
    useEffect(() => {
        navigation.replace("Home");
    }, []);

    const handleChangeScreen = () => {
        navigation.replace(screenName === "Sign Up" ? "Sign In" : "Sign Up");
    };

    const handleChangeInput = (data, field) => {
        setUserData((userInput) => ({
            ...userInput,
            [`user${field}`]: data,
        }));
    };

    const handleAuthUser = () => {
        let userEmailError = !validateEmail(userData.userEmail);
        let userPasswordError =
            !checkPassword(userData.userPassword) ||
            (screenName === "Sign Up" &&
                comparePassword(
                    userData.userPassword,
                    userData.userConfirmPassword
                ));
        let showUserPasswordHint =
            userPasswordError && userData.userPassword.includes("@");
        let userConfirmPasswordError =
            screenName === "Sign Up" &&
            comparePassword(
                userData.userPassword,
                userData.userConfirmPassword
            );

        setUserData((userInput) => ({
            ...userInput,
            userEmailError,
            userPasswordError,
            showUserPasswordHint,
            userConfirmPasswordError,
        }));

        if (
            !userEmailError &&
            !userPasswordError &&
            !showUserPasswordHint &&
            !userConfirmPasswordError
        ) {
            setUserData(initialState);
            navigation.replace("Home");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps={"handled"}
            >
                <View style={styles.bodyContainer}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputField}>
                            <TextInput
                                autoFocus
                                error={userData.userEmailError}
                                label="Email"
                                mode="outlined"
                                keyboardType="email-address"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                autoCapitalize="none"
                                value={userData.userEmail}
                                onChangeText={(text) =>
                                    handleChangeInput(text, "Email")
                                }
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    ref_password_input.current.focus()
                                }
                                style={styles.input}
                            />
                            <HelperText
                                type="error"
                                visible={userData.userEmailError}
                            >
                                Email address is invalid!
                            </HelperText>
                        </View>

                        <View style={styles.inputField}>
                            <TextInput
                                secureTextEntry
                                error={userData.userPasswordError}
                                label="Password"
                                mode="outlined"
                                autoCompleteType="password"
                                textContentType="password"
                                autoCapitalize="none"
                                value={userData.userPassword}
                                onChangeText={(text) =>
                                    handleChangeInput(text, "Password")
                                }
                                ref={ref_password_input}
                                returnKeyType={
                                    screenName === "Sign Up"
                                        ? "next"
                                        : "default"
                                }
                                onSubmitEditing={() =>
                                    screenName === "Sign Up"
                                        ? ref_confirm_password_input.current.focus()
                                        : handleAuthUser()
                                }
                                style={styles.input}
                            />

                            <HelperText
                                type={
                                    userData.userPasswordError
                                        ? "error"
                                        : "info"
                                }
                            >
                                {userData.userPasswordError &&
                                    "Password is invalid! \n\n"}
                                {userData.showUserPasswordHint &&
                                    'Hint - Try adding other symbols along with "@"\n\n'}
                                {"- Min length - 8 \n"}
                                {"- Min lowercase character - 1 \n"}
                                {"- Min uppercase character - 1 \n"}
                                {"- Min numeric character - 1 \n"}
                                {"- Min symbol - 1 \n"}
                            </HelperText>
                        </View>

                        {screenName === "Sign Up" && (
                            <View style={styles.inputField}>
                                <TextInput
                                    secureTextEntry
                                    error={userData.userConfirmPasswordError}
                                    label="Confirm Password"
                                    mode="outlined"
                                    autoCompleteType="password"
                                    textContentType="password"
                                    autoCapitalize="none"
                                    value={userData.userConfirmPassword}
                                    onChangeText={(text) =>
                                        handleChangeInput(
                                            text,
                                            "ConfirmPassword"
                                        )
                                    }
                                    ref={ref_confirm_password_input}
                                    style={styles.input}
                                />
                                <HelperText
                                    type="error"
                                    visible={userData.userConfirmPasswordError}
                                >
                                    Password is invalid!
                                </HelperText>
                            </View>
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
        paddingTop: 100,
        paddingBottom: 40,
    },
    bodyContainer: {
        alignItems: "center",
    },
    inputContainer: {
        width: 300,
    },
    input: {
        backgroundColor: "#fff",
    },
    inputField: {
        marginBottom: 15,
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
