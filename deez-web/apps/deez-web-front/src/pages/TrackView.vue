<script setup>
    import Store from "../store/index";
    import { useRoute, useRouter, RouterLink } from "vue-router";

    const store = Store.info.data;
    const route = useRoute();
    const router = useRouter();

    // if (store.results.length <= 0) router.push({ path: "/" });

    console.log("STORE Track", store.track);
</script>
<template>
    <h1>Titre :{{ store.track.title }}</h1>
</template>
