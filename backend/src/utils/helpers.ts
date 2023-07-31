import { fileURLToPath } from 'url';
import path from "path";
import * as fs from 'fs';

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
