import fs from "fs";

export function readJson(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(String(data)));
    });
  });
}
