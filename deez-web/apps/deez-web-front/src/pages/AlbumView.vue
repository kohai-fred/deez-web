<script setup>
    import Store from "../store/index";
    import { toRaw, onUpdated, onMounted } from "vue";
    import { useRoute, useRouter, RouterLink } from "vue-router";

    const store = Store.state;
    const methods = Store.methods;
    const route = useRoute();
    const router = useRouter();

    function formatTrackAndPlaying(track) {
        const trackFormated = JSON.parse(JSON.stringify(track));
        const albumFormated = JSON.parse(JSON.stringify(store.album));

        trackFormated.album = albumFormated;

        methods.addStoreCurrentTrack(trackFormated);
    }
    onUpdated(() => {
        methods.checkIsFavExist(store.album.type, store.album.id);
    });
    onMounted(() => {
        if (store?.album?.id)
            methods.checkIsFavExist(store.album.type, store.album.id);
    });
</script>
<template>
    <div
        class="d-flex justify-content-center align-items-center"
        v-if="!store.album.id"
    >
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="container" v-else>
        <img
            :src="store.album.cover_big"
            :alt="'Image de couverture de : ' + store.album.title"
            class="img-fluid rounded mb-5 d-lg-block mx-lg-auto"
        />
        <h1 class="fw-bolder fst-italic fs-1 text-center mb-3">
            {{ store.album.title }}
        </h1>
        <p class="mb-0">
            <span>{{ store.album.fans }} fans</span>
            <span>
                <button class="btn border-0 no-focus">
                    <i
                        :key="store.updateFavs"
                        :id="store.album.id"
                        class="bi bi-heart js-addFavs"
                        @click="methods.addFavs(store.album)"
                    ></i>
                </button>
            </span>
        </p>
        <RouterLink
            :to="`/artist/${store.album.artist?.id}`"
            @click="methods.getInfo(store.album.artist?.id, 'artist')"
            class="d-flex align-items-baseline mb-5"
        >
            <img
                :src="store.album.artist?.picture_small"
                :alt="('Photo du groupe ', store.album.artist?.name)"
                class="rounded me-3 card_img"
            />
            {{ store.album.artist?.name }}
        </RouterLink>

        <div class="tracklist_container">
            <p class="mb-3 d-flex justify-content-between align-items-baseline">
                <span class="h4 text-decoration-underline">Tracks list :</span>
                <span class="fs-6">({{ store.album.nb_tracks }})</span>
            </p>

            <div
                class="card_result d-flex rounded mb-3 pb-lg-3 shadow-sm"
                v-for="track in store.album.tracks?.data"
                :key="track.id"
            >
                <div
                    class="car_img_container rounded-circle overflow-hidden me-2"
                >
                    <img
                        :src="store.album.cover_medium"
                        :alt="'Photo de l\'album: ' + store.album.title"
                        class="card_img"
                    />
                    <i
                        class="bi bi-play d-flex"
                        @click="formatTrackAndPlaying(track)"
                    ></i>
                </div>

                <div class="card-content col-11 row">
                    <div
                        class="col-10 overflow-hidden d-flex align-items-center"
                    >
                        <p class="fs-6 mb-0">
                            <RouterLink
                                :to="`/track/${track.id}`"
                                class="a-text-break d-block"
                                @click="methods.getInfo(track.id, 'track')"
                            >
                                {{ track.title_short }}
                            </RouterLink>
                        </p>
                    </div>
                    <div
                        class="col-2 d-flex justify-content-center align-items-center"
                    >
                        <RouterLink :to="`/track/${track.id}`">
                            <i
                                class="bi bi-arrow-right-circle fs-4"
                                @click="methods.getInfo(track.id, 'track')"
                            ></i>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center my-5">
            <a
                :href="store.album.link"
                target="blank"
                class="btn btn-info text-light"
            >
                Retrouver l'album sur Deezer
            </a>
        </div>
    </div>
</template>
