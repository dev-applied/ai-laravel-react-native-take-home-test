import React, {useCallback, useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, ActivityIndicator} from "react-native";
import PropertyCard from "@/components/PropertyCard";
import type {Property} from "@/types/property";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useFocusEffect} from "expo-router";
import {useListingsStore} from "@/store";
import {useInfiniteQuery} from "@tanstack/react-query";
import useDebounce from "@/utils/useDebounce";
import useAxios from "@/utils/useAxios";
import {Pagination} from "@/types/pagination";

export default function SearchScreen() {
    const inset = useSafeAreaInsets()
    const {search, setSearch} = useListingsStore()
    const axios = useAxios()

    const debouncedSearch = useDebounce(search, 1000)

    const getProperties = ({pageParam}: { pageParam: number }): Promise<Pagination<Property[]>> => axios.get('/properties', {
        params: {
            search: debouncedSearch,
            page: pageParam
        }
    }).then(res => res.data)

    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['properties', {search: debouncedSearch}],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.next_page_url ? lastPage.current_page + 1 : undefined,
        queryFn: getProperties,
        retry: false
    })

    const [properties, setProperties] = useState<Property[]>([])
    useEffect(() => {
        console.log(data)
        setProperties(data?.pages?.map(p => p.data)?.flat() ?? []);
    }, [data])

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSearch('')
            };
        }, [setSearch])
    );

    const toggleLike = (address: string) => {
        setProperties((prev) =>
            prev.map((property) =>
                property.address === address
                    ? { ...property, liked: !property.liked }
                    : property
            )
        );
    };

    return (
        <FlatList
            data={properties}
            ListHeaderComponent={error ? <Text style={{color: 'white'}}>Error: {error.message}</Text> : null}
            keyExtractor={(item) => item.address}
            contentContainerStyle={[styles.listContent, {paddingBottom: inset.bottom}]}
            renderItem={({item}) => (
                <PropertyCard property={item} showLikeButton onToggleLike={() => toggleLike(item.address)}/>
            )}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator color="white" /> : null}
        />
    );
}

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,
    },
});
