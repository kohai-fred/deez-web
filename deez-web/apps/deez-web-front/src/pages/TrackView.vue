<script setup>
    import Store from "../store/index";
    import { toRaw } from "vue";
    import { useRoute, useRouter, RouterLink } from "vue-router";

    const store = Store.state;
    const route = useRoute();
    const router = useRouter();

    // if (store.results.length <= 0) router.push({ path: "/" });

    console.log("STORE Track", toRaw(store).track);
</script>
<template>
    <h1>Titre :{{ store.track.title }}</h1>
</template>
