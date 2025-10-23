export default function Ticket({ ticket, onMove, _, onDelete }) {
  return (
    <div className="ticket">
      <h4>{ticket.title}</h4>
      {ticket.description && (
        <p style={{ marginTop: 6 }}>{ticket.description}</p>
      )}

      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        {ticket.status !== "todo" && (
          <button onClick={() => onMove?.(ticket.id, "todo")}>To TODO</button>
        )}
        {ticket.status !== "doing" && (
          <button onClick={() => onMove?.(ticket.id, "doing")}>To DOING</button>
        )}
        {ticket.status !== "done" && (
          <button onClick={() => onMove?.(ticket.id, "done")}>To DONE</button>
        )}

        <button
          onClick={() => onDelete?.(ticket.id)}
          style={{ marginLeft: "auto" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

