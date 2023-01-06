import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Image,
} from "react-native";

export default function TextInputBox({
    value,
    onChangeText,
    placeholder,
    leftIcon,
    secure,
    paddingh,
    autoFocus,
    onBlur,
    maxLength,
    multiline,
    numberOfLines
}) {

    return (
        <View style={styles.textInputContainer}>
            <View style={styles.textInputInnerContainer}>
                <Image
                    source={leftIcon}
                    style={styles.Icons}
                />
                <TextInput
                    secureTextEntry={secure}
                    placeholder={placeholder}
                    placeholderTextColor="#6B7076"
                    style={{ ...styles.textInput, paddingHorizontal: paddingh }}
                    onChangeText={onChangeText}
                    value={value}
                    autoFocus={autoFocus}
                    autoCapitalize="none"
                    onBlur={onBlur}
                    maxLength={maxLength}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textInputInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    Icons: {
        position: "absolute",
        left: 5,
        zIndex: 9999,
        top: 15,
        width: 24, height: 24, resizeMode: 'contain'
    },
    textInput: {
        flex: 1,
        height: 46,
        borderColor: "#323C43",
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1.5,
        borderBottomColor: '#F0F4F5',
        color: "#000",
        fontWeight: 'bold'
    },
});
