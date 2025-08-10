import http from "http";
import fs from "fs";
import url from "url";
import mimetypes from "mime-types";

const PORT = 5000;

const Server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.url.match("/") && req.method === "GET") {
        const ParsedURL = url.parse(req.url, true);
        let FilePath = ParsedURL.path.replace(/^\/+|\/+$/g, "");

        if (FilePath === "") FilePath = "index.html";

        const File = import.meta.dirname.replace("/dist", "") + "/public/" + FilePath;

        fs.readFile(File, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end();
            } else {
                res.setHeader("X-Content-Type-Options", "nosniff");
                const MIME = mimetypes.lookup(FilePath);
                res.writeHead(200, {"Content-Type": (MIME as string)});
                res.end(content);
            }
        });
    }
});

Server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});