<script setup>
    import { toRaw, onUpdated, onMounted } from "vue";
    import { useRoute, useRouter, RouterLink } from "vue-router";
    import Store from "../store";

    const store = Store.state;
    const methods = Store.methods;
    const route = useRoute();
    const router = useRouter();

    // if (store.results.length <= 0) router.push({ path: "/" });

    function secondToMinute(duration) {
        let time = new Date();
        time.setTime(duration * 1000);
        const result = time.getMinutes() + "m" + time.getSeconds() + "s";
        return result;
    }

    onUpdated(() => {
        methods.checkIsFavExist(store.track.type, store.track.id);

        const starsWrapper = document.querySelector(".stars_wrapper");
        if (!starsWrapper.hasChildNodes()) {
            methods.calculRank(store.track.rank, starsWrapper);
        }
        // secondToMinute(store.track.duration);
    });

    onMounted(() => {
        if (store?.track?.id) {
            methods.calculRank(
                store.track.rank,
                document.querySelector(".stars_wrapper")
            );
            methods.checkIsFavExist(store.track.type, store.track.id);
        }
    });
</script>
<template>
    <div
        class="d-flex justify-content-center align-items-center"
        v-if="!store.track.id"
    >
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="container" v-else>
        <img
            :src="store.track.album?.cover_big"
            :alt="'Image de couverture de : ' + store.track.title"
            class="img-fluid rounded mb-5 d-lg-block mx-lg-auto"
        />
        <h1 class="fw-bolder fst-italic fs-1 text-center mb-3">
            {{ store.track.title }}
            <i
                class="bi bi-explicit-fill fs-6 ms-2"
                v-if="store.track.explicit_lyrics"
            ></i>
        </h1>
        <section class="mb-0 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <div class="stars_wrapper"></div>
                <button class="btn border-0 no-focus">
                    <i
                        :key="store.updateFavs"
                        :id="store.track.id"
                        class="bi bi-heart js-addFavs"
                        @click="methods.addFavs(store.track)"
                    ></i>
                </button>
            </div>
            <div>
                <i
                    class="bi bi-play-circle fs-1"
                    @click="methods.addStoreCurrentTrack(store.track)"
                ></i>
            </div>
        </section>

        <section class="mb-3">
            <div class="m-0">
                <p class="mb-0">
                    Date de sortie : {{ store.track.release_date }}
                </p>
                <p class="mb-0">
                    Durée : {{ secondToMinute(store.track.duration) }}
                </p>
            </div>
            <div>
                <p class="mb-0 fst-italic fs-bold d-flex">
                    Album : 
                    <RouterLink
                        :to="`/album/${store.track.album?.id}`"
                        @click="methods.getInfo(store.track.album?.id, 'album')"
                        class="d-flex align-items-baseline"
                    >
                        {{ store.track.album?.title }}
                    </RouterLink>
                </p>
            </div>
        </section>

        <section class="">
            <p class="mb-0 fst-italic fs-bold">
                Contributeur
                <span v-if="store.track.contributors.length > 1">s</span>
                 :
            </p>
            <div class="d-flex">
                <div
                    v-for="contributor in store.track.contributors"
                    class="m-2"
                >
                    <RouterLink
                        :to="`/artist/${contributor.id}`"
                        @click="
                            methods.getInfo(store.track.artist?.id, 'artist')
                        "
                        class="d-flex align-items-baseline"
                    >
                        <div class="d-flex flex-column align-items-center">
                            <img
                                :src="contributor.picture_small"
                                :alt="
                                    ('Photo de l\'artiste ', contributor.name)
                                "
                                class="rounded-circle card-img"
                            />
                            <div class="d-flex flex-column align-items-center">
                                <p class="m-0">{{ contributor.name }}</p>
                                <p class="fs-6 m-0">({{ contributor.role }})</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .bi-play-circle {
        color: var(--base_blue);
    }
</style>
