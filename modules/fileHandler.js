const fs = require("fs");
const path = require("path");

class FileHandler {
    constructor(baseDir, msg) {
        this.baseDir = baseDir || __dirname;
        this.msg = msg;
    }

    // Append text to file.txt (create if not exists)
    appendToFile(filename, text, callback) {
        const filePath = path.join(this.baseDir, filename);

        fs.appendFile(filePath, text + "\n", (err) => {
            if (err) return callback(err, null);
            callback(null, this.msg.fileWriteSuccess);
        });
    }

    // Read file content
    readFile(filename, callback) {
        const filePath = path.join(this.baseDir, filename);

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    return callback(new Error(this.msg.fileNotFound), null);
                }
                return callback(err, null);
            }
            callback(null, data);
        });
    }
}

module.exports = FileHandler;
