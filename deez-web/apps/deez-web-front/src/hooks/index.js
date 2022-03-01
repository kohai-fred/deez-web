import { useQuery } from "vue-query";
// import { setup } from "vue";
const BASE_URL = "http://localhost:8080";

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
        `${BASE_URL}/search?q=${query}&order=ALBUM_DESC`
    ).then((res) => res.json());

    return response;
}
