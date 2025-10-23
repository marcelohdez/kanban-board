import Ticket from "./Ticket";

export default function Column({ title, tickets, onMove, onUpdate, onDelete }) {
  return (
    <div className="column">
      <h3 style={{ textTransform: "uppercase" }}>{title}</h3>
      {tickets.length === 0 && <p style={{ color: "#6b7280" }}>No tickets</p>}
      {tickets.map((t) => (
        <Ticket
          key={t.id}
          ticket={t}
          onMove={onMove}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

