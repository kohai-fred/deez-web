import { reactive } from "vue";
// import { useRouter } from "vue-router";
const BASE_URL = "http://localhost:8080";

const state = reactive({
    searchName: "",
    searchResults: [],
    playlists: [],
    album: {},
    artist: {},
    track: {},
    currentTrack: {},
    trackList: [],
    updateFavs: 0,
});

const methods = reactive({
    addFavs(fav) {
        state.updateFavs++;
        const target = event.target;
        const storage = JSON.parse(localStorage.getItem("deezweb"));

        // Remove Fav
        if (storage?.[fav.type]?.[fav.id]) {
            delete storage[fav.type][fav.id];
            localStorage.setItem("deezweb", JSON.stringify(storage));
            target.classList.replace("bi-heart-fill", "bi-heart");
            return;
        }

        // Create and add Fav
        if (!storage) {
            const obj = {
                [fav.type]: {
                    [fav.id]: fav,
                },
            };
            localStorage.setItem("deezweb", JSON.stringify(obj));
            target.classList.replace("bi-heart", "bi-heart-fill");

            return;
        }

        // Create Type (album/artist/track) and add Fav
        if (!storage[fav.type]) {
            storage[fav.type] = {
                [fav.id]: fav,
            };
            localStorage.setItem("deezweb", JSON.stringify(storage));
            target.classList.replace("bi-heart", "bi-heart-fill");

            return;
        }

        // Add Fav
        storage[fav.type][fav.id] = fav;
        localStorage.setItem("deezweb", JSON.stringify(storage));
        target.classList.replace("bi-heart", "bi-heart-fill");
    },
    checkIsFavExist(type, id) {
        const storage = JSON.parse(localStorage.getItem("deezweb"));
        const btnFav = document.querySelectorAll(".js-addFavs");

        if (storage?.[type]?.[id]) {
            btnFav.forEach((btn) => {
                if (btn.id === id.toString())
                    btn.classList.replace("bi-heart", "bi-heart-fill");
            });
        } else {
            btnFav.forEach((btn) => {
                if (btn.id === id.toString()) {
                    btn.classList.replace("bi-heart-fill", "bi-heart");
                }
            });
        }
    },

    async getInfo(id, type) {
        const response = await fetch(
            `${BASE_URL}/${type}/${id.toString()}`
        ).then((res) => res.json());

        state[type] = JSON.parse(response[0]);
        if (type === "artist") state.trackList = JSON.parse(response[1]);
    },

    addStoreCurrentTrack(track) {
        state.currentTrack = track;
    },
    calculRank(rank, containerHtml) {
        const result = (rank * 100) / 1000000 / 20;
        const halfStar = result % 5;
        const remaining = halfStar > 0 ? 5 - (result + 1) : 5 - result;
        // const wrapperStar = document.querySelector(".stars_wrapper");
        const div = document.createElement("div");

        for (let i = 1; i < result; i++) {
            const star = document.createElement("i");
            star.classList.add("bi", "bi-star-fill");
            div.insertAdjacentElement("beforeend", star);
        }
        if (halfStar != 0) {
            const star = document.createElement("i");
            star.classList.add("bi", "bi-star-half");
            div.insertAdjacentElement("beforeend", star);
        }
        for (let i = 0; i < remaining; i++) {
            const star = document.createElement("i");
            star.classList.add("bi", "bi-star");
            div.insertAdjacentElement("beforeend", star);
        }
        containerHtml.insertAdjacentElement("afterbegin", div);
    },
});

export default {
    state,
    methods,
};
