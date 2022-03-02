<script setup>
    // import { useQueryProvider } from "vue-query";
    // useQueryProvider();
    import Header from "./components/Header.vue";
</script>

<template>
    <div>
        <Header />
        <main class="container">
            <RouterView />
        </main>
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
    }
</style>
