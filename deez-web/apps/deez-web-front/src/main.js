import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

// import { VueQueryPlugin } from "vue-query";

const router = createRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./pages/HomeView.vue"),
        },
        {
            path: "/results",
            component: () => import("./pages/ResultSearchView.vue"),
        },
        {
            path: "/album/:id",
            component: () => import("./pages/AlbumView.vue"),
        },
        {
            path: "/artist/:id",
            component: () => import("./pages/ArtistView.vue"),
        },
        {
            path: "/track/:id",
            component: () => import("./pages/TrackView.vue"),
        },
        {
            path: "/favorites",
            component: () => import("./pages/FavoritesView.vue"),
        },
    ],
    history: createWebHistory(import.meta.env.BASE_URL),
});

const app = createApp(App);

app.use(router);
// app.use(VueQueryPlugin);

app.mount("#app");
