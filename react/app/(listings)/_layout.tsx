import {Slot} from "expo-router";
import {StyleSheet, TextInput, View} from "react-native";
import HeaderHero from "@/components/HeaderHero";
import {useListingsStore} from "@/store";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'


export default function ListingsLayout() {
    const {search, setSearch} = useListingsStore()
    const {title} = useListingsStore()
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.home}>
                <HeaderHero title={title}/>
                <View style={styles.searchWrap}>
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#6B7280"
                        value={search}
                        onChangeText={setSearch}
                        style={styles.search}
                    />
                </View>
                <Slot/>
            </View>
        </QueryClientProvider>
    );
}


const styles = StyleSheet.create({
    home: {flex: 1, backgroundColor: "#012340"},
    searchWrap: {
        paddingHorizontal: 16,
    },
    search: {
        height: 44,
        borderRadius: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        fontSize: 16,
        // subtle shadow
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 2},
        elevation: 3,
    },
});
