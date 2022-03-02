<script setup>
    import Store from "../store/index";
    import { toRaw } from "vue";
    import { useRoute, useRouter, RouterLink } from "vue-router";
    import { queryInfo } from "../hooks";
    const store = Store.state;
    const route = useRoute();
    const router = useRouter();
    const title = route.query.search;

    if (store.searchResults.length <= 0) router.push({ path: "/" });

    console.log("STORE ROUTE 3", toRaw(store).searchResults);
    console.log("Route ROUTE 3", route.query);

    async function getInfo(id, type) {
        const response = await queryInfo({ id: id.toString(), type });
        router.push({
            path: `/${type}/${id}`,
        });
    }
</script>

<template>
    <div class="container" :key="$route">
        <h1>Résultat de la recherche :{{ store.searchName }}</h1>
        <div
            class="card"
            v-for="result in store.searchResults"
            :key="result.id"
        >
            <!-- <template
                v-if="
                    $route.query.order === 'TRACK_ASC' ||
                    $route.query.order === 'ALBUM_ASC'
                "
            > -->
            <RouterLink :to="`/album/${result.album.id}`">
                <img
                    :src="result.album.cover_medium"
                    :alt="'Photo de l\'album: ' + result.album.title"
                    @click="getInfo(result.album.id, 'album')"
                />
            </RouterLink>
            <button @click="getInfo(result.album.id, 'album')">TEST</button>
            <div class="card_content">
                <h1>
                    <RouterLink
                        :to="`/album/${result.album.id}`"
                        @click="getInfo(result.album.id, 'album')"
                    >
                        {{ result.album.title }}
                    </RouterLink>
                </h1>
                <RouterLink
                    :to="`/artist/${result.artist.id}`"
                    class="Artiste"
                    @click="getInfo(result.artist.id, 'artist')"
                >
                    {{ result.artist.name }}
                </RouterLink>
                <span>
                    Vous écoutez :
                    <RouterLink
                        :to="`/track/${result.id}`"
                        @click="getInfo(result.id, 'track')"
                    >
                        {{ result.title }}
                    </RouterLink>
                </span>
                <audio :src="result.preview" controls></audio>
                <RouterLink :to="`/album/${result.album.id}`">
                    <button>i</button>
                </RouterLink>
                <span>Rank :{{ result.rank }}</span>
            </div>
            <!-- </template>
            <template v-else>
                <RouterLink :to="`/artist/${result.artist.id}`">
                    <img
                        :src="result.artist.picture_medium"
                        :alt="'Photo de l\'artiste: ' + result.artist.name"
                        @click="getInfo(result.artist.id, 'artist')"
                    />
                </RouterLink>
                <div class="card_content">
                    <h1 class="artiste">
                        <RouterLink
                            :to="`/artist/${result.artist.id}`"
                            @click="getInfo(result.artist.id, 'artist')"
                        >
                            {{ result.artist.name }}
                        </RouterLink>
                    </h1>
                    <RouterLink
                        :to="`/album/${result.album.id}`"
                        @click="getInfo(result.album.id, 'album')"
                    >
                        {{ result.album.title }}
                    </RouterLink>
                    <span>
                        Vous écoutez :
                        <RouterLink
                            :to="`/track/${result.id}`"
                            @click="getInfo(result.id, 'track')"
                        >
                            {{ result.title }}
                        </RouterLink>
                    </span>
                    <audio :src="result.preview" controls></audio>
                    <RouterLink :to="`/track/${result.id}`">
                        <button>i</button>
                    </RouterLink>
                    <span>Rank :{{ result.rank }}</span>
                </div>
            </template> -->
        </div>
    </div>
</template>
