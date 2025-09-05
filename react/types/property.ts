export interface Property {
    address: string
    city?: string
    province?: string
    postalCode?: string
    features?: {key: string, value: string[]}[]
    imageURLs?: string[]
    liked?: boolean
    distance_from_search: number
    dateAdded: number
    dateUpdated: number
}
