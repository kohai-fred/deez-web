### Présentation

Le site DeezWeb permet de rechercher un artiste, un titre ou un album.
Vous pouvez trier cette recherche :

-   Albums croissant
-   Titres croissant
-   Artistes croissant
-   Popularité croissant
-   Rang

Dans le Header, vous trouverez un barre de recherche ansi que l'accès à la page de vos favoris.

Sur la "Homepage" on retrouve au moins un slider avec les playlists du moment.
Si vous mettez des favoris, vous les retrouverez aussi sur cette page.

Une fois une recherche effectuée, une page de résultat vous permettra de pouvoir acceder aux différentes informations ainsi que d'écouter un extrait.
le player restera persistant sur chacune des pages que vous visiterez.

L'application a été pensée en mobile first.

### Outils

Les outils utilisés sont:

-   VueJs3 ( pour la partie front. C'est la 1ere fois)
-   Vue-router (pour la navigation entre les pages)
-   Vue-query (j'ai tenté pour la gestion du state mais je n'ai pas réussi)
-   Vite (Bundler préconnisé par VueJs3)
-   Fastify et Fastify-cores côté le back (pour passer le problème de CORS de l'API Deezer. 1ere fois)
-   Got (pour faire les requêtes côté back. 1ere fois)
-   pnpm (pour télécharger les modules ainsi que pour créer un workspace.)
-   Bootstrap 5 (CDN. 1ere fois)
-   SliderJs (CDN pour la gestion du slider)

### Lancement du projet

Se mettre dans le dossier deez-web e
Dans la console taper la commande:

-   "pnpm i" pour récupérer tous les packages.
-   "pnpm run --parallel dev", ça lancera le workspace (le front et le back en même temps)
    Dans une URL aller sur le lien (http://localhost:3000)

### Features

-   La gestions des favoris est triée par album/artiste/chanson que vous retrouverez sur la page favoris.
-   Sur la page artiste il y a la tracklist associée en plus.

# Développer

la playlist.

### Bugs

Sur la Homepage, certaines images du slider des favoris n'envoie sur aucune page.
Ceci est dû que SliderJs créer des clones de l'élément HTML mais ne clone pas la méthode associée...
