<script setup>
    import Store from "../store/index";
    import { toRaw, onUpdated, onMounted } from "vue";
    import { useRoute, useRouter, RouterLink } from "vue-router";

    const store = Store.state;
    const methods = Store.methods;
    const route = useRoute();
    const router = useRouter();

    onUpdated(() => {
        methods.checkIsFavExist(store.artist.type, store.artist.id);
    });

    onMounted(() => {
        // if (!store.artist.id) {
        //     console.log("IF", router);
        //     router.push({ name: "home" });
        //     return;
        // }
        if (store?.artist?.id)
            methods.checkIsFavExist(store.artist.type, store.artist.id);
    });
</script>
<template>
    <div
        class="d-flex justify-content-center align-items-center"
        v-if="!store.artist.id"
    >
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="container" v-else>
        <img
            :src="store.artist.picture_big"
            :alt="'Image de couverture de : ' + store.artist.name"
            class="img-fluid rounded mb-5 d-lg-block mx-lg-auto"
        />
        <h1 class="fw-bolder">{{ store.artist.name }}</h1>
        <p class="fan">
            <span>{{ store.artist.nb_fan }} fans</span>
            <span>
                <button class="btn border-0 no-focus">
                    <i
                        class="bi bi-heart js-addFavs"
                        @click="methods.addFavs(store.artist)"
                    ></i>
                </button>
            </span>
        </p>
        <p>
            <span class="fw-bold">Nombre d'albums :</span>
             {{ store.artist.nb_album }}
        </p>
        <div class="d-flex justify-content-center my-5">
            <a
                :href="store.artist.link"
                target="blank"
                class="btn btn-info text-light"
            >
                Retrouver l'artiste sur Deezer
            </a>
        </div>

        <div class="tracklist_container">
            <p class="h4 mb-2">Track list :</p>
            <div
                class="card_result d-flex rounded mb-3 pb-lg-3 shadow-sm"
                v-for="track in store.trackList.data"
                :key="track.id"
            >
                <div
                    class="car_img_container rounded-circle overflow-hidden me-2"
                >
                    <img
                        :src="track.album.cover_medium"
                        :alt="'Photo de l\'album: ' + track.album.title"
                        class="card_img"
                    />
                    <i
                        class="bi d-flex"
                        @click="methods.addStoreCurrentTrack(track)"
                    ></i>
                </div>

                <div class="card-content col-11 row">
                    <div class="col-10 overflow-hidden">
                        <p class="fs-6 mb-0">
                            <RouterLink
                                :to="`/track/${track.id}`"
                                class="a-text-break d-block"
                                @click="methods.getInfo(track.id, 'track')"
                            >
                                {{ track.title_short }}
                            </RouterLink>
                        </p>
                        <p class="fs-6 mb-0">
                            <RouterLink
                                :to="`/album/${track.album.id}`"
                                class="a-text-break d-block"
                                @click="
                                    methods.getInfo(track.album.id, 'album')
                                "
                            >
                                {{ track.album.title }}
                            </RouterLink>
                        </p>
                    </div>
                    <div
                        class="col-2 d-flex justify-content-center align-items-center"
                    >
                        <RouterLink :to="`/album/${track.album.id}`">
                            <i
                                class="bi bi-arrow-right-circle fs-4"
                                @click="
                                    methods.getInfo(track.album.id, 'album')
                                "
                            ></i>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
