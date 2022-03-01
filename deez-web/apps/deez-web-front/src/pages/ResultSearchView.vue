<script setup>
    import Store from "../store/index";
    import { useRoute, useRouter, RouterLink } from "vue-router";
    const store = Store.state;
    const route = useRoute();
    const router = useRouter();
    const title = route.query.search;

    if (store.results.length <= 0) router.push({ path: "/" });

    console.log("STORE ROUTE 3", store.results);
    console.log("Route ROUTE 3", route.query);
</script>

<template>
    <h1>Résultat de la recherche :{{ title }}</h1>

    <div class="container" :key="$route">
        <div class="card" v-for="result in store.results" :key="result.id">
            <template
                v-if="
                    $route.query.order === 'TRACK_ASC' ||
                    $route.query.order === 'ALBUM_ASC'
                "
            >
                <RouterLink :to="`/info/${result.album.id}`">
                    <img
                        :src="result.album.cover_medium"
                        :alt="'Photo de l\'album: ' + result.album.title"
                    />
                </RouterLink>
                <div class="card_content">
                    <h1>
                        <RouterLink :to="`/info/${result.album.id}`">
                            {{ result.album.title }}
                        </RouterLink>
                    </h1>
                    <RouterLink
                        :to="`/info/${result.artist.id}`"
                        class="Artiste"
                    >
                        {{ result.artist.name }}
                    </RouterLink>
                    <span>
                        Vous écoutez :
                        <RouterLink :to="`/info/${result.id}`">
                            {{ result.title }}
                        </RouterLink>
                    </span>
                    <audio :src="result.preview" controls></audio>
                    <RouterLink :to="`/info/${result.id}`">
                        <button>i</button>
                    </RouterLink>
                </div>
            </template>
            <template v-else>
                <RouterLink :to="`/info/${result.artist.id}`">
                    <img
                        :src="result.artist.picture_medium"
                        :alt="'Photo de l\'artiste: ' + result.artist.name"
                    />
                </RouterLink>
                <div class="card_content">
                    <h1 class="artiste">
                        <RouterLink :to="`/info/${result.artist.id}`">
                            {{ result.artist.name }}
                        </RouterLink>
                    </h1>
                    <RouterLink :to="`/info/${result.album.id}`">
                        {{ result.album.title }}
                    </RouterLink>
                    <span>
                        Vous écoutez :
                        <RouterLink :to="`/info/${result.id}`">
                            {{ result.title }}
                        </RouterLink>
                    </span>
                    <audio :src="result.preview" controls></audio>
                    <RouterLink :to="`/info/${result.id}`">
                        <button>i</button>
                    </RouterLink>
                </div>
            </template>
        </div>
    </div>
</template>
