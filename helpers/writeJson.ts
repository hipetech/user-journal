import fs from "fs";

export function writeJson<T>(path: string, object: T) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(object), (err) => {
      if (err) reject(err);
    });
  });
}
