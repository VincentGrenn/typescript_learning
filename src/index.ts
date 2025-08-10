import http from "http";
import { ServeFile } from "./controllers/mainController.js";

const PORT = 5000;

const Server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.url.match("/") && req.method === "GET") {
        ServeFile(req, res);
    }
});

Server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});