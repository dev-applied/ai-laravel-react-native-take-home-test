import React from "react";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import HERO from "../assets/images/cover.png";
import LOGO from "../assets/images/adaptive-icon.png";
import NavLink from "@/components/NavLink";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function HeaderHero(props: { title: string | null }) {
    const inset = useSafeAreaInsets()
    const height = props.title ? 370 : 320;
    return (
        <ImageBackground source={HERO} style={[styles.bg, {height}]} imageStyle={styles.bgImg}>

            <LinearGradient
                colors={["rgba(0,0,0,0)", "#012340"]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={StyleSheet.absoluteFill}
            />
            <View style={[styles.topRow, {paddingTop: inset.top + 12}]}>
                <LinearGradient
                    colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.15)"]}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.5}}
                    style={StyleSheet.absoluteFill}
                />
                <Image
                    source={LOGO}
                    style={styles.logo}
                />
                <View style={styles.nav}>
                    <NavLink href="/">Search</NavLink>
                    <NavLink href="/wishlist">Wishlist</NavLink>
                </View>
            </View>
            {props.title && (
                <View style={{paddingHorizontal: 16}}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        overflow: "hidden",
        marginBottom: -200,
    },
    bgImg: {resizeMode: "cover"},
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingBottom: 12,
        gap: 12,
    },
    title: {color: "#fff", fontSize: 28, fontWeight: "700", textAlign: "center"},
    logo: {width: 36, height: 36, borderRadius: 8},
    nav: {flexDirection: "row", gap: 16, marginLeft: 8},
});
