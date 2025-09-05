import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function RootLayout() {
    return (
        <>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}
