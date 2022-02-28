import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    routes: [
        { path: "/", component: () => import("./pages/Route1View.vue") },
        {
            path: "/route2/:id",
            component: () => import("./pages/Route2View.vue"),
        },
    ],
    history: createWebHistory(import.meta.env.BASE_URL),
});

const app = createApp(App);

app.use(router);

app.mount("#app");
