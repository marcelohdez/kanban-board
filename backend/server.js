import express from "express";
import cors from "cors";
import dbPromise from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const getTicketById = async (id) => {
  const db = await dbPromise;
  return db.get("SELECT * FROM tickets WHERE id = ?", id);
};

app.get("/tickets", async (_, res) => {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM tickets");
  res.json(rows);
});

app.post("/tickets", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const db = await dbPromise;
    const result = await db.run(
      "INSERT INTO tickets (title, description, status) VALUES (?, ?, ?)",
      title,
      description || "",
      status || "todo",
    );
    const created = await getTicketById(result.lastID);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

app.put("/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Build dynamic query safely
    const existing = await getTicketById(id);
    if (!existing) return res.status(404).json({ error: "Ticket not found" });

    const newTitle = typeof title === "undefined" ? existing.title : title;
    const newDescription =
      typeof description === "undefined" ? existing.description : description;
    const newStatus = typeof status === "undefined" ? existing.status : status;

    const db = await dbPromise;
    await db.run(
      "UPDATE tickets SET title = ?, description = ?, status = ? WHERE id = ?",
      newTitle,
      newDescription,
      newStatus,
      id,
    );

    res.json(await getTicketById(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

app.delete("/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;
    const info = await db.run("DELETE FROM tickets WHERE id = ?", id);
    if (info.changes === 0)
      return res.status(404).json({ error: "Ticket not found" });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
