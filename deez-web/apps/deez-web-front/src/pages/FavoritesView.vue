<script setup>
    import { ref } from "vue";
    import { RouterLink } from "vue-router";
    import Store from "../store";
    const store = Store.state;
    const methods = Store.methods;

    let favorites = ref();
    let storage;
    function getFavsInStorage() {
        storage = JSON.parse(localStorage.getItem("deezweb"));
        if (storage) favorites.value = JSON.parse(JSON.stringify(storage));
    }
    getFavsInStorage();

    function removeFav(id, type) {
        delete storage[type][id];
        localStorage.setItem("deezweb", JSON.stringify(storage));
        getFavsInStorage();
        methods.checkIsFavExist(type, id);
    }
</script>

<template>
    <div class="container" :key="store.updateFavs">
        <h1 class="text-center my-5 fw-bold">Mes Favoris</h1>
        <div v-if="!favorites">Désolé rien ici</div>
        <div v-else>
            <!-- TRACKS -->
            <article v-if="favorites.track" class="mb-5">
                <p class="fs-3">Mes titres</p>
                <div class="tracks_container d-flex flex-wrap gap-3">
                    <div
                        v-for="track in favorites.track"
                        class="tile rounded bg-secondary bg-gradient p-2 d-flex"
                    >
                        <div class="car_img_container me-2">
                            <img
                                :src="track.album.cover_big"
                                :alt="track.title"
                                class="rounded card_img"
                            />
                            <i
                                class="bi bi-play d-flex"
                                @click="methods.addStoreCurrentTrack(track)"
                            ></i>
                        </div>
                        <div>
                            <p class="mb-0">
                                Titre : 
                                <RouterLink
                                    :to="`/track/${track.id}`"
                                    @click="methods.getInfo(track.id, 'track')"
                                >
                                    {{ track.title_short }}
                                </RouterLink>
                            </p>
                            <span>
                                Artiste : 
                                <RouterLink
                                    :to="`/artist/${track.artist.id}`"
                                    @click="
                                        methods.getInfo(
                                            track.artist.id,
                                            'artist'
                                        )
                                    "
                                >
                                    {{ track.artist.name }}
                                </RouterLink>
                            </span>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center"
                        >
                            <i
                                class="bi bi-trash js-addFavs d-flex mx-4"
                                @click="removeFav(track.id, track.type)"
                            ></i>
                        </div>
                    </div>
                </div>
            </article>

            <!-- ARTISTE -->
            <article v-if="favorites.artist" class="mb-5">
                <p class="fs-3">Mes artist</p>
                <div class="tracks_container d-flex flex-wrap gap-3">
                    <div
                        v-for="artist in favorites.artist"
                        class="tile rounded bg-secondary bg-gradient p-2 d-flex"
                    >
                        <div class="car_img_container me-2">
                            <img
                                :src="artist.picture_small"
                                :alt="artist.name"
                                class="rounded card_img"
                            />
                        </div>
                        <div>
                            <p class="mb-0">
                                Artist: 
                                <RouterLink
                                    :to="`/artist/${artist.id}`"
                                    @click="
                                        methods.getInfo(artist.id, 'artist')
                                    "
                                >
                                    {{ artist.name }}
                                </RouterLink>
                            </p>
                            <span>
                                <a :href="artist.link" target="blank">
                                    Voir sur Deezer
                                </a>
                            </span>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center"
                        >
                            <i
                                class="bi bi-trash js-addFavs d-flex mx-4"
                                @click="removeFav(artist.id, artist.type)"
                            ></i>
                        </div>
                    </div>
                </div>
            </article>

            <!-- ALBUM -->
            <article v-if="favorites.album" class="mb-5">
                <p class="fs-3">Mes albums</p>
                <div class="tracks_container d-flex flex-wrap gap-3">
                    <div
                        v-for="album in favorites.album"
                        class="tile rounded bg-secondary bg-gradient p-2 d-flex"
                    >
                        <div class="car_img_container me-2">
                            <img
                                :src="album.cover_small"
                                :alt="album.title"
                                class="rounded card_img"
                            />
                        </div>
                        <div>
                            <p class="mb-0">
                                Album: 
                                <RouterLink
                                    :to="`/album/${album.id}`"
                                    @click="methods.getInfo(album.id, 'album')"
                                >
                                    {{ album.title }}
                                </RouterLink>
                            </p>
                            <span>
                                Artiste : 
                                <RouterLink
                                    :to="`/artist/${album.artist.id}`"
                                    @click="
                                        methods.getInfo(
                                            album.artist.id,
                                            'artist'
                                        )
                                    "
                                >
                                    {{ album.artist.name }}
                                </RouterLink>
                            </span>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center"
                        >
                            <i
                                class="bi bi-trash js-addFavs d-flex mx-4"
                                @click="removeFav(album.id, album.type)"
                            ></i>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<style scoped>
    .car_img_container {
        position: relative;
        min-width: fit-content;
    }
    .car_img_container::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: hsla(360, 0%, 20%, 0.5);
    }
    .car_img_container i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
