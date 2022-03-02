import fastify from "fastify";
import fastifyCors from "fastify-cors";
import got from "got";
import { url } from "inspector";

const app = fastify();
const BASE_URL = "https://api.deezer.com";

app.register(fastifyCors, {
    origin: true,
});

app.get("/playlists", async (request, reply) => {
    const response = await got(
        "https://api.deezer.com/chart/0/playlists?limit=20"
    );
    reply.send(response.body);
});

app.get("/search", async (request, reply) => {
    const response = await got(
        `${BASE_URL}/search?q=${request.query.q}&order=${request.query.order}`
    );
    reply.send(response.body);
});

app.get("/album/:id", async (request, reply) => {
    const response = await got(`${BASE_URL}/album/${request.params.id}`);
    reply.send(response.body);
});
app.get("/artist/:id", async (request, reply) => {
    const response = await got(`${BASE_URL}/artist/${request.params.id}`);
    reply.send(response.body);
});
app.get("/track/:id", async (request, reply) => {
    const response = await got(`${BASE_URL}/track/${request.params.id}`);
    reply.send(response.body);
});

app.listen(8080);
