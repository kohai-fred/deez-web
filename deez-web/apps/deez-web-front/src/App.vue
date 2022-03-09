<script setup>
    // import { useQueryProvider } from "vue-query";
    // useQueryProvider();
    import { onMounted, toRaw } from "vue";
    import Store from "./store";
    import HeaderVue from "./components/Header.vue";
    import PlayerVue from "./components/Player.vue";
    import { usePlaylists } from "./hooks";

    const store = Store.state;
</script>

<template>
    <div>
        <HeaderVue />
        <main class="container main__container">
            <RouterView />
        </main>
        <PlayerVue />
    </div>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* text-align: center; */
        /* color: #2c3e50; */
        /* margin-top: 60px; */
        background: var(--bs-gray-800);
    }
    .main__container {
        overscroll-behavior-y: contain;
        overflow: hidden;
        padding-bottom: 150px;
    }
</style>
