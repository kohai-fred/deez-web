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
export default {
    search,
    info,
};
