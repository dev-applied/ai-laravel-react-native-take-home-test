import axios from "axios";

const client = axios.create({
    headers: {
        common: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    },
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
})



export default function useAxios() {
    return client
}
