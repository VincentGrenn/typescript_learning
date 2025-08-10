import http from "http";
import fs from "fs";
import url from "url";
const STATIC_FILES = [
    "../public/index.js",
    "../public/style.css",
    "../public/script.js"
];
const PORT = 5000;
const Server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        const ParsedURL = url.parse(req.url, true);
        let FilePath = ParsedURL.path.replace(/^\/+|\/+$/g, "");
        if (FilePath === "")
            FilePath = "index.html";
        console.log(`Requested Path: ${FilePath}`);
        const File = import.meta.dirname.replace("/dist", "") + "/public/" + FilePath;
        console.log("New Generated File Path:");
        console.log(File);
        fs.readFile(File, (err, content) => {
            if (err) {
                console.log(err);
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "File not found. 404."
                }));
            }
            else {
                res.setHeader("X-Content-Type-Options", "nosniff");
                switch (FilePath) {
                    case "main.css":
                        res.writeHead(200, { "Content-Type": "text/css" });
                        break;
                    case "script.js":
                        res.writeHead(200, { "Content-Type": "application/javascript" });
                        break;
                    case "index.html":
                        res.writeHead(200, { "Content-Type": "text/html" });
                        break;
                    default:
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            message: "Unknown file. That's all we know."
                        }));
                        return;
                }
                res.end(content);
            }
        });
    }
});
Server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});
//# sourceMappingURL=index.js.map