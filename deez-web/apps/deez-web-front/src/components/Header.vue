<script setup>
    import { ref } from "vue";
    import { useRouter, RouterLink } from "vue-router";
    import Store from "../store";
    import { toRaw } from "vue";
    import { querySearch } from "../hooks";

    const store = Store.state;
    const router = useRouter();

    const inputSearch = ref();
    const order = ref("");
    const filter = ref("artist");

    async function search() {
        const query = {
            search: inputSearch.value,
            order: order.value,
            filter: filter.value,
        };
        const response = await querySearch(query);
        store.searchResults = response.data;
        store.searchName = inputSearch.value;

        router.push({
            path: `/results`,
            query: {
                search: inputSearch.value,
                by: filter.value,
                order: order.value,
            },
        });

        // In mobile we need to close manualy 😓
        closeBurgerMenu();
    }

    function closeBurgerMenu() {
        const btn = document.querySelector("button.navbar-toggler");
        if (!btn.classList.contains("collapsed")) {
            btn.click();
        }
    }
</script>

<template>
    <header class="header_search bg-dark shadow sticky-top mb-3 mb-lg-5">
        <nav class="navbar navbar-expand-lg container">
            <div class="container-fluid">
                <RouterLink :to="{ name: 'home' }" class="navbar-brand">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                    >
                        <path
                            d="M 34 2 C 33.684297 1.9995781 33.380703 2.1485625 33.189453 2.4140625 C 32.933453 2.7680625 32.938219 3.2476562 33.199219 3.5976562 C 33.228219 3.6356563 36 7.411 36 12 C 36 17.793 31.438375 19.919875 26.609375 22.171875 C 22.377375 24.144875 18 26.186 18 31 C 18 33.966 19.918 34 20 34 C 20.378 34 20.726484 33.783312 20.896484 33.445312 C 20.952484 33.334313 22.042859 31.247906 24.630859 30.378906 L 25.011719 27.851562 C 25.094719 27.306562 25.604437 26.928719 26.148438 27.011719 C 26.695438 27.093719 27.072234 27.601438 26.990234 28.148438 L 26.708984 30.013672 C 26.806984 30.009672 26.899 30 27 30 C 30.808 30 31 33.659578 31 34.392578 C 31 36.378578 29.422563 39.213328 25.226562 39.861328 L 25.041016 41.089844 L 24.140625 47.980469 C 24.425625 47.988469 24.709 48 25 48 C 35.665 48 47 40.58575 47 26.84375 C 47 20.51675 45.447484 18.552609 45.271484 18.349609 C 45.016484 18.057609 44.615141 17.938875 44.244141 18.046875 C 43.871141 18.152875 43.592297 18.464656 43.529297 18.847656 C 43.523297 18.878656 42.987 22 41 22 C 40.524 22 40.388078 21.838531 40.330078 21.769531 C 39.647078 20.958531 40.138094 18.136219 40.496094 16.074219 C 40.755094 14.584219 41 13.178 41 12 C 41 4.368 34.383406 2.0737812 34.316406 2.0507812 C 34.211906 2.0160313 34.105234 2.0001406 34 2 z M 24.048828 5.0019531 C 23.964469 4.9977188 23.879922 5.0042344 23.794922 5.0214844 C 23.455922 5.0924844 23.178547 5.3332031 23.060547 5.6582031 C 22.083547 8.3402031 18.504 16 15 16 C 13.736 16 13.419453 15.507703 13.314453 15.345703 C 12.609453 14.247703 13.304203 11.740969 13.908203 10.417969 C 14.075203 10.052969 14.009281 9.6231719 13.738281 9.3261719 C 13.467281 9.0311719 13.047969 8.9226406 12.667969 9.0566406 C 12.272969 9.1956406 3.0019531 12.617922 3.0019531 26.169922 C 3.0019531 36.278922 9.5635781 46.497703 22.142578 47.845703 L 23.060547 40.810547 L 23.183594 39.992188 C 18.579594 39.914187 14 37.129 14 31 C 14 25.19 19.064844 22.687625 23.964844 20.265625 C 28.405844 18.069625 33 15.798 33 11 C 33 8.821 32.445031 8.0309688 32.207031 7.7929688 C 31.921031 7.5069688 31.492188 7.4231719 31.117188 7.5761719 C 30.743187 7.7311719 30.5 8.096 30.5 8.5 C 30.5 10.719 28.437437 12.263437 26.773438 13.148438 C 27.601437 9.5964375 25.936656 6.5815469 24.722656 5.3105469 C 24.543406 5.1230469 24.301906 5.0146562 24.048828 5.0019531 z"
                        />
                    </svg>
                </RouterLink>
                <button
                    class="navbar-toggler collapsed d-flex d-lg-none flex-column justifu-content-around"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <!-- <span class="navbar-toggler-icon"></span> -->
                    <span class="toggler-icon top-bar"></span>
                    <span class="toggler-icon middle-bar"></span>
                    <span class="toggler-icon bottom-bar"></span>
                </button>
                <div
                    class="collapse navbar-collapse flex-grow-0 text-light mt-lg-0"
                    id="navbarSupportedContent"
                >
                    <ul
                        class="navbar-nav me-auto mb-2 mb-lg-0 mt-4 mt-lg-0 align-items-lg-center"
                    >
                        <li>
                            <RouterLink to="/favorites">
                                <i
                                    class="bi bi-heart fs-3 js-addFavs d-none d-lg-flex me-3"
                                ></i>
                            </RouterLink>
                        </li>
                        <li class="nav-item mb-5 mb-lg-0 me-lg-1">
                            <input
                                type="text"
                                placeholder="Rechercher"
                                v-model="inputSearch"
                                class="form-control me-2"
                            />
                        </li>
                        <li class="nav-item mb-5 mb-lg-0 me-lg-1">
                            <select
                                name="filter"
                                id="filter"
                                v-model="filter"
                                class="form-select me-2"
                            >
                                <option value="artist" selected>Artiste</option>
                                <option value="album">Album</option>
                                <option value="track">Titre</option>
                            </select>
                        </li>
                        <li class="nav-item mb-5 mb-lg-0 me-lg-1">
                            <select
                                name="order"
                                id="order"
                                v-model="order"
                                class="form-select me-2"
                            >
                                <option value="">Trier par...</option>
                                <option value="ALBUM_ASC">Album</option>
                                <option value="ARTIST_ASC">Artiste</option>
                                <option value="TRACK_ASC">Titre</option>
                                <option value="RATING_ASC">Popularité</option>
                                <option value="RANKING">Rang</option>
                            </select>
                        </li>
                        <li
                            class="nav-item mb-3 mb-lg-0 d-flex justify-content-around align-items-center"
                        >
                            <button
                                class="btn btn-outline-primary bg-light d-flex my-lg-0 fw-bold"
                                @click="search"
                            >
                                <i class="bi bi-search fs-3 d-flex me-2"></i>
                                Rechercher
                            </button>

                            <RouterLink
                                to="/favorites"
                                class="d-lg-none btn btn-outline-danger bg-light d-flex fw-bold"
                                @click="closeBurgerMenu"
                            >
                                <i
                                    class="bi bi-heart-fill fs-3 d-flex me-2 js-addFavs"
                                ></i>
                                Voir mes favoris
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
    svg {
        width: 35px;
        height: 35px;
        animation: colorChange 12s linear infinite;
    }
    @keyframes colorChange {
        0% {
            fill: var(--base_red);
        }
        50% {
            fill: var(--base_blue);
        }
        100% {
            fill: var(--base_red);
        }
    }

    /* TEST BUTTON BURGER */
    .navbar-toggler {
        width: 20px;
        height: 20px;
        position: relative;
        transition: 0.5s ease-in-out;
    }

    .navbar-toggler,
    .navbar-toggler:focus,
    .navbar-toggler:active,
    .navbar-toggler-icon:focus {
        outline: none;
        box-shadow: none;
        border: 0;
        position: relative;
    }

    .navbar-toggler span {
        margin: 0;
        padding: 0;
    }

    .toggler-icon {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: var(--base_red);
        border-radius: 1px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
    }

    .middle-bar {
        margin-top: 0px;
    }

    /* State when the navbar is collapsed */

    .navbar-toggler.collapsed .top-bar {
        position: absolute;
        top: 0px;
        transform: rotate(0deg);
    }

    .navbar-toggler.collapsed .middle-bar {
        opacity: 1;
        position: absolute;
        top: 10px;
        filter: alpha(opacity=100);
    }

    .navbar-toggler.collapsed .bottom-bar {
        position: absolute;
        top: 20px;
        transform: rotate(0deg);
    }

    /* when navigation is clicked */

    .navbar-toggler .top-bar {
        top: inherit;
        transform: rotate(135deg);
    }

    .navbar-toggler .middle-bar {
        opacity: 0;
        top: inherit;
        filter: alpha(opacity=0);
    }

    .navbar-toggler .bottom-bar {
        top: inherit;
        transform: rotate(-135deg);
    }

    /* Color of 3 lines */

    .navbar-toggler.collapsed .toggler-icon {
        background: linear-gradient(
            263deg,
            var(--base_red) 0%,
            var(--base_blue) 100%
        );
    }
</style>
