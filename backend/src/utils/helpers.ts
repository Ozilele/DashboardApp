import { fileURLToPath } from 'url';
import path from "path";
import * as fs from 'fs';
import { redisClient } from '../config/db.js';
import { DEFAULT_EXPIRATION } from '../config/allowedOrigins.js';

export const uploadFile = (imageData : string, imageName : string, folder : string) => {
  const parts : string[] = imageName.split('.');
  const ext : string = parts[parts.length - 1];
  let filename : string = Date.now() + '.' + ext;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootFolder = path.resolve(__dirname, '../../');
  const uploadsFolder = path.join(rootFolder, `./uploads/${folder}`);
  const pathToFile = uploadsFolder + "/" + filename;
  // Kowersja danych z formatu base64 encoded strings na dane binarne w postaci bufora
  const bufferData : Buffer = Buffer.from(imageData.split(",")[1], 'base64');
  fs.writeFile(pathToFile, bufferData, () => {
    console.log('File saved ' + pathToFile);
  });
  return filename;
}


export const getOrSetCache = <T>(key: string, cb: () => Promise<T>): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    redisClient.get(key)
      .then(async (data: string) => {
        if(data != null) {
          const parsedData: T = JSON.parse(data);
          return resolve(parsedData);
        }
        const freshData: T = await cb(); // getting data from the callback(db query)
        redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
        return resolve(freshData);
      })
      .catch((err: Error) => {
        return reject(err);
      });
  });
}

