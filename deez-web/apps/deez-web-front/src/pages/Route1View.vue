<script setup>
    import { usePlaylists, querySearch } from "../hooks/index.js";
    import { ref, onMounted } from "vue";
    import { RouterLink } from "vue-router";
    // import { useQuery } from "vue-query";

    const playlists = ref([]);
    const input = ref([]);
    onMounted(async () => {
        const response = await usePlaylists();
        playlists.value = response.data;
    });
</script>

<template>
    <h1>ROUTE 1</h1>
    <input
        type="text"
        placeholder="search"
        @change="getResult"
        v-model="input"
    />
    <ul v-for="playlist in playlists">
        <RouterLink :to="`/album/:id`">
            {{ playlist.title }}
        </RouterLink>
    </ul>
</template>
