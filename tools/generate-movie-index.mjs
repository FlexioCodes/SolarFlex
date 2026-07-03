import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const moviesDir = path.resolve("movies");
const entries = await readdir(moviesDir, { withFileTypes: true });

const movies = entries
  .filter(e => e.isFile() && e.name.toLowerCase().endsWith(".mp4"))
  .map(e => ({ name: e.name, path: `./movies/${e.name}` }))
  .sort((a, b) => a.name.localeCompare(b.name));

await writeFile(
  path.join(moviesDir, "index.json"),
  JSON.stringify({ movies }, null, 2) + "\n",
  "utf8"
);

console.log(`Wrote movies/index.json with ${movies.length} movie(s).`);
