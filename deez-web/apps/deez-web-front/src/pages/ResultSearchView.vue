<script setup>
    import Store from "../store/index";
    import { useRoute, useRouter, RouterLink } from "vue-router";

    const store = Store.state;
    const methods = Store.methods;
    const route = useRoute();
    const router = useRouter();

    if (store.searchResults.length <= 0) router.push({ path: "/" });
</script>

<template>
    <div class="container" :key="$route">
        <p class="fs-3">
            Résultat de la recherche :
            <span class="text-capitalize">{{ store.searchName }}</span>
        </p>

        <div
            class="card_result d-flex rounded mb-3 pb-lg-3 shadow-sm"
            v-for="result in store.searchResults"
            :key="result.id"
        >
            <div class="car_img_container rounded-circle overflow-hidden me-2">
                <img
                    :src="result.album.cover_medium"
                    :alt="'Photo de l\'album: ' + result.album.title"
                    class="card_img"
                />
                <i
                    class="bi bi-play d-flex"
                    @click="methods.addStoreCurrentTrack(result)"
                ></i>
            </div>

            <div class="card-content col-11 row">
                <div class="col-10 overflow-hidden">
                    <p class="fs-6 mb-0">
                        <RouterLink
                            :to="`/album/${result.album.id}`"
                            class="a-text-break d-block"
                            @click="methods.getInfo(result.album.id, 'album')"
                        >
                            {{ result.album.title }}
                        </RouterLink>
                    </p>
                    <p class="fs-6 mb-0">
                        <RouterLink
                            :to="`/artist/${result.artist.id}`"
                            class="a-text-break d-block"
                            @click="methods.getInfo(result.artist.id, 'artist')"
                        >
                            {{ result.artist.name }}
                        </RouterLink>
                    </p>
                </div>
                <div
                    class="col-2 d-flex justify-content-end align-items-center"
                >
                    <RouterLink :to="`/artist/${result.artist.id}`">
                        <i
                            class="bi bi-arrow-right-circle fs-4"
                            @click="methods.getInfo(result.artist.id, 'artist')"
                        ></i>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
