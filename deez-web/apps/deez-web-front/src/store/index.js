import { reactive } from "vue";

const search = reactive({
    data: [],
});
const info = reactive({
    data: {
        album: {},
        artist: {},
        track: {},
    },
});
const state = reactive({
    searchName: "",
    searchResults: [],
    album: {},
    artist: {},
    track: {},
});
export default {
    search,
    info,
    state,
};
