<script setup>
    import { onMounted } from "vue";
    console.log("route_1");
    onMounted(async () => {
        const response = await fetch("http://localhost:8080/playlists").then(
            (res) => res.json()
        );
        console.log("reponse", response);
    });
</script>

<template>
    <h1>ROUTE 1</h1>
</template>
