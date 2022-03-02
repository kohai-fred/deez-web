import { useQuery } from "vue-query";
import Store from "../store";

// import { setup } from "vue";
const BASE_URL = "http://localhost:8080";
const store = Store.info.data;

export function usePlaylists() {
    // const { data: playlists, isLoading } = useQuery(
    //     "playlists",
    //     fetch("http://localhost:8080/playlists").then((res) => res.json()),
    //     {
    //         staleTime: 60 * 1000,
    //     }
    // );

    // return playlists, isLoading;
    const response = fetch(`${BASE_URL}/playlists`).then((res) => res.json());
    return response;
}

export async function querySearch(query) {
    console.log("query", query);
    const response = await fetch(
        `${BASE_URL}/search?q=${query.search}&order=${query.order}`
    ).then((res) => res.json());

    return response;
}

export async function queryInfo(query) {
    console.log("QUERY:", query.type, " ", typeof query.type);
    const response = await fetch(`${BASE_URL}/${query.type}/${query.id}`).then(
        (res) => res.json()
    );
    console.log("queryInfo = ", response);
    store[query.type] = response;
    return response;
}
