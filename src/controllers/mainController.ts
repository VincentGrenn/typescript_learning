import http from "http";
import fs from "fs";
import url from "url";
import mimetypes from "mime-types";

export function ServeFile(req: http.IncomingMessage, res: http.ServerResponse) {
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
};