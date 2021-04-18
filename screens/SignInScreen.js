import React, { useRef } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

const SignInScreen = () => {
    const ref_password_input = useRef();

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
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={() => {}}
                        >
                            Sign In
                        </Button>
                        <Button
                            mode="outlined"
                            style={styles.button}
                            onPress={() => {}}
                        >
                            Sign Up
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
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
        width: "70%",
    },
    button: {
        width: 135,
    },
});
