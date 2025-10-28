import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: "tasks.db",
  driver: sqlite3.Database,
});

(async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      status TEXT
    )
  `);
})();

export default dbPromise;
