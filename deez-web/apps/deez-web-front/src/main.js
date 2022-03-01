import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
// import { VueQueryPlugin } from "vue-query";

const router = createRouter({
    routes: [
        { path: "/", component: () => import("./pages/Route1View.vue") },
        {
            path: "/info/:id",
            component: () => import("./pages/InfoView.vue"),
        },
        {
            path: "/results",
            component: () => import("./pages/ResultSearchView.vue"),
        },
    ],
    history: createWebHistory(import.meta.env.BASE_URL),
});

const app = createApp(App);

app.use(router);
// app.use(VueQueryPlugin);

app.mount("#app");
