import React, {useMemo} from "react";
import {ImageBackground, Platform, Pressable, StyleSheet, Text, View,} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import type {Property} from "@/types/property";

type Props = {
    property: Property;
    onToggleLike?: () => void;
    showLikeButton?: boolean;
};

export default function PropertyCard({property, onToggleLike, showLikeButton}: Props) {
    const features = useMemo(() => {
        const amenities = property?.features?.find((feature) => feature.key === 'Amenities')?.value
        if (!amenities) return
        return amenities.slice(0, 5).join(', ')
    }, [property])

    const img = useMemo(() => {
        return property.imageURLs?.length ? property.imageURLs[0] : undefined
    }, [property])

    const address = useMemo(() => {
        return `${property.address}, ${property.city}, ${property.province} ${property.postalCode}`.trim()
    }, [property])

    return (
        <View style={styles.card}>
            <View style={styles.imageWrap}>
                <ImageBackground
                    source={{uri: img}}
                    style={styles.image}
                    imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                >
                    <View style={styles.distancePill}>
                        <Text style={styles.distanceText}>📍 {property.distance_from_search.toFixed(1)} mi</Text>
                    </View>

                    {showLikeButton && (<Pressable onPress={onToggleLike} style={styles.heartBtn} hitSlop={10}>
                        <Icon
                            name={property.liked ? "cards-heart" : "cards-heart-outline"}
                            size={22}
                            color={property.liked ? "#F87171" : "rgba(255,255,255,0.9)"}
                        />
                    </Pressable>)}
                </ImageBackground>
            </View>

            <View style={styles.body}>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.subtitle}>
                    {features}
                </Text>
                <View style={styles.metaRow}>
                    <Text style={styles.meta}>Created: {property.dateAdded}</Text>
                    <Text style={styles.meta}>Updated: {property.dateUpdated}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 8,
                shadowOffset: {width: 0, height: 4},
            },
            android: {elevation: 3},
        }),
    },
    imageWrap: {width: "100%", height: 170, backgroundColor: "#e5e7eb"},
    image: {flex: 1, justifyContent: "space-between"},
    distancePill: {
        alignSelf: "flex-start",
        backgroundColor: "#F87171",
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },
    distanceText: {color: "#fff", fontWeight: "700", fontSize: 12},
    heartBtn: {
        alignSelf: "flex-end",
        margin: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.35)",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {paddingHorizontal: 14, paddingVertical: 12, gap: 6},
    address: {fontWeight: "700", color: "#1F2937"},
    subtitle: {color: "#6B7280"},
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    meta: {color: "#9CA3AF", fontSize: 12},
});
