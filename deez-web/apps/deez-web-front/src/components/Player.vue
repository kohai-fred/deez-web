<script setup>
    import { onUpdated, toRaw } from "vue";
    import { RouterLink } from "vue-router";
    import Store from "../store";

    const track = Store.state;
    const methods = Store.methods;

    onUpdated(() => {
        methods.checkIsFavExist(track.currentTrack.type, track.currentTrack.id);
    });
</script>

<template>
    <div class="component_player fixed-bottom w-100 shadow">
        <div
            class="player_container container"
            v-if="track.currentTrack?.title_short"
        >
            <div class="title_track_container">
                <p class="fs-6 m-2">
                    <RouterLink
                        :to="`/track/${track.currentTrack.id}`"
                        class="a-text-break"
                        @click="methods.getInfo(track.currentTrack.id, 'track')"
                    >
                        {{ track.currentTrack.title }}
                    </RouterLink>
                </p>
            </div>
            <div class="d-flex align-items-center justify-content-between py-2">
                <img
                    :src="track.currentTrack.album.cover_small"
                    :alt="track.currentTrack.title"
                    class="rounded shadow"
                />
                <audio
                    :src="track.currentTrack.preview"
                    controls
                    autoplay
                    class="w-50"
                >
                    Votre navigateur ne supporte pas l'élément
                    <code>audio</code>
                    .
                </audio>
                <button class="btn border-0 no-focus">
                    <i
                        :id="track.currentTrack.id"
                        class="bi bi-heart fs-3 js-addFavs"
                        @click="methods.addFavs(track.currentTrack)"
                    ></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .component_player {
        background-color: #212529ee;
    }
</style>
