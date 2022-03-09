<script setup>
    import { usePlaylists, querySearch } from "../hooks/index.js";
    import { ref, onMounted, toRaw, onUpdated } from "vue";
    import { RouterLink } from "vue-router";
    import Store from "../store/index.js";
    // import { useQuery } from "vue-query";

    const store = Store.state;
    const methods = Store.methods;
    const storage = ref();
    function checkLocalStorage(type, id) {
        storage.value = JSON.parse(localStorage.getItem("deezweb"));
    }

    function createNewSplide(classOrId) {
        const splide = new Splide(`${classOrId}`, {
            type: "loop",
            perPage: 8,
            autoWidth: true,
            start: 0,
            perMove: 1,
            pagination: false,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            gap: "1em",
            focus: "center",
            clones: 0,
            breakpoints: {
                992: {
                    arrows: false,
                },
            },
        });
        splide.mount();
    }
    onMounted(async () => {
        const response = await usePlaylists();
        store.playlists = response.data;

        checkLocalStorage();
    });
    onUpdated(async () => {
        if (store?.playlists) createNewSplide("#splide_playlists");
        if (storage.value?.album) createNewSplide("#splide_favTrack");
        if (storage.value?.album) createNewSplide("#splide_favAlbum");
    });
</script>

<template>
    <h1>Bienvenue</h1>

    <!-- <ul v-for="playlist in store.playlists">
        <RouterLink :to="`/album/:id`">
            {{ playlist.title }}
        </RouterLink>
    </ul> -->

    <div class="splide_playlists__container container">
        <p class="">Playlist</p>
        <div
            id="splide_playlists"
            class="splide"
            v-if="store.playlists.length > 0"
        >
            <div class="splide__track">
                <ul class="splide__list">
                    <li
                        class="splide__slide shadow"
                        v-for="playlist in store.playlists"
                    >
                        <img
                            :src="playlist.picture_big"
                            alt=""
                            class="rounded img-thumbnail"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="splide_playlists__container container" v-if="storage?.track">
        <p class="">Titres favoris</p>
        <div id="splide_favTrack" class="splide">
            <div class="splide__track">
                <ul class="splide__list">
                    <li
                        class="splide__slide shadow"
                        v-for="track in storage.track"
                    >
                        <RouterLink
                            :to="`/track/${track.id}`"
                            class="a-text-break"
                        >
                            <img
                                :src="track.album.cover_big"
                                :alt="'Couverture de l\'album ' + track.title"
                                class="rounded img-thumbnail"
                                @click="methods.getInfo(track.id, 'track')"
                            />
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="splide_playlists__container container" v-if="storage?.album">
        <p class="">Albums favoris</p>
        <div id="splide_favAlbum" class="splide">
            <div class="splide__track">
                <ul class="splide__list">
                    <li
                        class="splide__slide shadow"
                        v-for="album in storage.album"
                    >
                        <RouterLink
                            :to="`/album/${album.id}`"
                            class="a-text-break"
                        >
                            <img
                                :src="album.cover_big"
                                :alt="'Couverture de l\'album ' + album.title"
                                class="rounded img-thumbnail"
                                @click="methods.getInfo(album.id, 'album')"
                            />
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .splide__slide img {
        width: 100px;
    }
    @media screen and (min-width: 768px) {
        .splide__slide img {
            width: 150px;
        }
    }
    @media screen and (min-width: 960px) {
        .splide__slide img {
            width: 200px;
        }
    }
</style>
