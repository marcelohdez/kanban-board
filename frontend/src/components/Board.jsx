import Column from "./Column";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function Board({ tickets, setTickets }) {
  const columns = ["todo", "doing", "done"];
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const createTicket = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post(`${API}/tickets`, {
        title: newTitle,
        description: newDesc,
        status: "todo",
      });
      // API returns created ticket
      setTickets((t) => [res.data, ...t]);
      setNewTitle("");
      setNewDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  const updateTicket = async (id, patch) => {
    try {
      const res = await axios.put(`${API}/tickets/${id}`, patch);
      setTickets((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`${API}/tickets/${id}`);
      setTickets((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="controls">
        <input
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button onClick={createTicket}>Add ticket</button>
      </div>

      <div className="board">
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            tickets={tickets.filter((t) => t.status === col)}
            onMove={(id, toStatus) => updateTicket(id, { status: toStatus })}
            onUpdate={(id, patch) => updateTicket(id, patch)}
            onDelete={(id) => deleteTicket(id)}
          />
        ))}
      </div>
    </div>
  );
}

