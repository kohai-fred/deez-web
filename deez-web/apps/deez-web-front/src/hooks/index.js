import { useQuery } from "vue-query";
import Store from "../store";
/**
 * * Here we pass a pseudo request with the real query or parameters
 * * The real request are in "proxy-back/index.js"
 */
const BASE_URL = "http://localhost:8080";
const store = Store.state;

export function usePlaylists() {
    const response = fetch(`${BASE_URL}/playlists`).then((res) => res.json());
    return response;
    // I try to use Vue-query without succes 😥
    // const { data: playlists, isLoading } = useQuery(
    //     "playlists",
    //     fetch("http://localhost:8080/playlists").then((res) => res.json()),
    //     {
    //         staleTime: 60 * 1000,
    //     }
    // );

    // return playlists, isLoading;
}

/**
 * *Retrieves results from the "Search" section of the Deezer API"
 * @param {Obeject} query filter match with Advenced search in API Deezer
 */
export async function querySearch(query) {
    console.log("query", query);
    const response = await fetch(
        `${BASE_URL}/search?q=${query.search}&order=${query.order}&filter=${query.filter}`
    ).then((res) => res.json());

    return response;
}

/**
 * * Retrieves results from the "Album/ Artist/ Track" section of the Deezer API
 * * Save the result in different store objects to access it everywhere
 * @param {Object} query "Type" === album or artist or track
 */
export async function queryInfo(query) {
    const response = await fetch(`${BASE_URL}/${query.type}/${query.id}`).then(
        (res) => res.json()
    );
    console.log("queryInfo = ", response);
    store[query.type] = response;
}
