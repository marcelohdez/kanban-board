import { useEffect, useState } from "react";
import axios from "axios";
import Board from "./components/Board";

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/tickets`);
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <Board tickets={tickets} setTickets={setTickets} />
      )}
    </div>
  );
}

