import http from "http";
import fs from "fs";
import url from "url";
import mimetypes from "mime-types";
const PORT = 5000;
const Server = http.createServer((req, res) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`URL: ${req.url}`);
    if (req.url.match("/") && req.method === "GET") {
        const ParsedURL = url.parse(req.url, true);
        let FilePath = ParsedURL.path.replace(/^\/+|\/+$/g, "");
        console.log("Begin File PATH!");
        console.log(FilePath);
        if (FilePath === "")
            FilePath = "index.html";
        const File = import.meta.dirname.replace("/dist", "") + "/public/" + FilePath;
        console.log(File);
        console.log("End File PATH!");
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
                console.log(`Now serving ${FilePath}!`);
                const MIME = mimetypes.lookup(FilePath);
                res.writeHead(200, { "Content-Type": MIME });
                res.end(content);
            }
        });
    }
});
Server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});
//# sourceMappingURL=index.js.map