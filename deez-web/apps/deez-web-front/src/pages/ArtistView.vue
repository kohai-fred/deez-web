<script setup>
    import Store from "../store/index";
    import { useRoute, useRouter, RouterLink } from "vue-router";

    const store = Store.info.data;
    const route = useRoute();
    const router = useRouter();

    // if (store.results.length <= 0) router.push({ path: "/" });

    console.log("STORE Artist", store.artist);
</script>
<template>
    <h1>Artiste :{{ store.artist.name }}</h1>
</template>
