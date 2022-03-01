<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import Store from "../store";
    import { querySearch } from "../hooks";

    const store = Store.state;
    const router = useRouter();

    console.log("store", store);
    const inputSearch = ref([]);
    const order = ref([]);

    async function search() {
        console.log("this", inputSearch.value);
        const search = inputSearch.value;
        const response = await querySearch(search, {
            order: order.value,
        });
        store.results = response.data;

        router.push({
            path: `/results`,
            query: { search: search, order: order.value },
        });
    }
</script>

<template>
    <header class="header_search">
        <input type="text" placeholder="search" v-model="inputSearch" />
        <select name="order" id="order" v-model="order">
            <option value="">Tri par ordre ascendant</option>
            <option value="ALBUM_ASC">Album</option>
            <option value="ARTIST_ASC">Artiste</option>
            <option value="TRACK_ASC">Titre</option>
            <option value="RATING_ASC">Popularité</option>
            <option value="RANKING">Rang</option>
        </select>
        <button @click="search">Rechercher</button>
    </header>
</template>
