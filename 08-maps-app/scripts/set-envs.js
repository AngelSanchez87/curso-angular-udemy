
const { writeFileSync, mkdirSync } = require('fs')

require('dotenv').config();

const targetPath = `./src/environments/environment.ts`;
const targetPathDev = `./src/environments/environment.development.ts`;
const mapBoxKey = process.env.MAPBOX_KEY;

if (!mapBoxKey) {
  throw new Error("ERROR: Missing MAPBOX_KEY in environment variables.");
}

const envFileContent = `
export const environment = {
  mapBoxKey: '${mapBoxKey}'
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
