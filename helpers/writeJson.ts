import fs from "fs";

export function writeJson<T>(path: string, object: T) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(object, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
