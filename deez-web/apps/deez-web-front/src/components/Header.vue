<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import Store from "../store";
    import { querySearch } from "../hooks";

    const store = Store.search;
    const router = useRouter();

    console.log("store", store);
    const inputSearch = ref([]);
    const order = ref([]);

    async function search() {
        console.log("this", inputSearch.value);
        const search = inputSearch.value;
        const query = {
            search,
            order: order.value,
        };
        const response = await querySearch(query);
        store.data = response.data;

        router.push({
            path: `/results`,
            query: { search: search, order: order.value },
        });
    }
</script>

<template>
    <header class="header_search">
        <div class="container d-flex justify-content-between">
            <img
                src="https://img.icons8.com/ios-filled/150/000000/soundfry.png"
            />
            <div>
                <input type="text" placeholder="search" v-model="inputSearch" />
                <select name="order" id="order" v-model="order">
                    <option value="ALBUM_ASC" selected>Album</option>
                    <option value="ARTIST_ASC">Artiste</option>
                    <option value="TRACK_ASC">Titre</option>
                    <option value="RATING_ASC">Popularité</option>
                    <option value="RANKING">Rang</option>
                </select>
                <button class="btn btn-primary btn-lg" @click="search">
                    Rechercher
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped>
    img {
        width: 150px;
        height: 150px;
    }
</style>
