const http = require("http");
const url = require("url");
const UTILS = require("./modules/utils");
const FILEHANDLER = require("./modules/fileHandler");
const MSG = require("./lang/en/en");

class Server {
    constructor(port) {
        this.port = port || 3000;
        this.utils = new UTILS(MSG.greeting);
        this.fileHandler = new FILEHANDLER(process.cwd(), MSG);
    }

    start() {
        const server = http.createServer((req, res) => {
            const queryObject = url.parse(req.url, true);

            // greeting
            if(req.url.startsWith("/COMP4537/labs/3/getDate")) {
                const name = queryObject.query.name;

                if (!name) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end("404 Not Found: name parameter is required");
                    return;
                }

                const responseMsg = this.utils.getDate(name);

                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(responseMsg);
            }
            // Write to file
            else if (req.url.startsWith("/COMP4537/labs/3/writeFile")) {
                const text = queryObject.query.text || "";
                
                this.fileHandler.appendToFile("file.txt", text, (err, message) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end(MSG.errorWritingFile);
                    } else {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(message);
                    }
                });
            }

            // Read from file
            else if (req.url.startsWith("/COMP4537/labs/3/readFile/file.txt")) {
                this.fileHandler.readFile("file.txt", (err, data) => {
                    if (err) {
                        res.writeHead(404, { "Content-Type": "text/plain" });
                        res.end(err.message);
                    } else {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(data);
                    }
                });
            
               // 404 for other routes 
            }else{
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end(MSG.NotFound);
                }
            
        });
        server.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

const app = new Server(3000);
app.start();