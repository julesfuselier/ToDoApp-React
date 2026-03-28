import {useState} from "react";

function Task({item, categories, onUpdateStatus, onDelete}) {

    const [isFull, setIsFull] = useState(false);

    const toggleFull = () => {
        setIsFull(!isFull);
    };

    return (
        <div className={`task ${isFull ? 'full' : ''}`} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>

            <div style={{ display: "flex", gap: "15px", alignItems: "center", cursor: "pointer" }} onClick={toggleFull}>
                <span>{isFull ? '▼' : '▶'}</span>

                <h3>{item.title}</h3>
                <span>{item.date_echeance}</span>

                {!isFull && (
                    <div>
                        {categories.slice(0, 2).map(cat => (
                            <span key={cat.id} style={{ backgroundColor: cat.color, padding: "2px 6px", marginRight: "5px", borderRadius: "5px" }}>
                                {cat.title}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {isFull && (
                <div style={{ marginTop: "15px", paddingLeft: "25px" }}>
                    <p><strong>Description :</strong> {item.description || "Aucune description"}</p>

                    <div>
                        <strong>Tous les dossiers : </strong>
                        {categories.map(cat => (
                            <span key={cat.id} style={{ backgroundColor: cat.color, padding: "2px 6px", marginRight: "5px", borderRadius: "5px" }}>
                                {cat.title}
                            </span>
                        ))}
                    </div>

                    <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                        <select
                            value={item.etat}
                            onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <option value="Nouveau">Nouveau</option>
                            <option value="En attente">En attente</option>
                            <option value="Reussi">Reussi</option>
                            <option value="Abandoné">Abandoné</option>
                        </select>

                        <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;