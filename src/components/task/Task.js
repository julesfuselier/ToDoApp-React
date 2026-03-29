import { useState } from "react";
import { isOverdue, formatDate } from "../../utils";
import { useApp } from "../../contexts/AppContext";

function Task({ item, categories }) {
    const { updateItemStatus, deleteItem, setEditingTask } = useApp();

    const [isFull, setIsFull] = useState(false);
    const isTaskOverdue = isOverdue(item.date_echeance, item.etat);

    const toggleFull = () => {
        setIsFull(!isFull);
    };

    const getStatusColor = (etat) => {
        switch(etat) {
            case "Nouveau": return "#3B82F6";
            case "En attente": return "#F59E0B";
            case "Reussi": return "#10B981";
            case "Abandoné": return "#6B7280";
            default: return "#6B7280";
        }
    };

    return (
        <div
            className={`task ${isFull ? 'full' : ''}`}
            style={{
                border: isTaskOverdue ? "2px solid #EF4444" : "1px solid #d1d5db",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: isTaskOverdue ? "#FEF2F2" : "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
        >

            <div style={{ display: "flex", gap: "15px", alignItems: "center", cursor: "pointer" }} onClick={toggleFull}>
                <span style={{ fontSize: "18px" }}>{isFull ? '▼' : '▶'}</span>

                <h3 style={{ flex: 1, margin: 0 }}>{item.title}</h3>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {isTaskOverdue && <span title="Tâche en retard !">⚠</span>}
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>
                         {formatDate(item.date_echeance)}
                    </span>
                </div>

                {!isFull && categories.length > 0 && (
                    <div style={{ display: "flex", gap: "5px" }}>
                        {categories.slice(0, 2).map(cat => (
                            <span
                                key={cat.id}
                                style={{
                                    backgroundColor: cat.color + "20",
                                    color: cat.color,
                                    border: `1px solid ${cat.color}`,
                                    padding: "4px 8px",
                                    borderRadius: "5px",
                                    fontSize: "12px",
                                    fontWeight: "500"
                                }}
                            >
                                {cat.icon} {cat.title}
                            </span>
                        ))}
                        {categories.length > 2 && (
                            <span style={{
                                backgroundColor: "#f3f4f6",
                                padding: "4px 8px",
                                borderRadius: "5px",
                                fontSize: "12px",
                                color: "#6b7280"
                            }}>
                                +{categories.length - 2}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {isFull && (
                <div style={{ marginTop: "15px", paddingLeft: "35px" }}>
                    <p><strong>Description :</strong> {item.description || "Aucune description"}</p>

                    <div style={{ marginTop: "10px" }}>
                        <strong>Dossiers : </strong>
                        {categories.length > 0 ? (
                            categories.map(cat => (
                                <span
                                    key={cat.id}
                                    style={{
                                        backgroundColor: cat.color + "20",
                                        color: cat.color,
                                        border: `1px solid ${cat.color}`,
                                        padding: "4px 8px",
                                        marginRight: "5px",
                                        borderRadius: "5px",
                                        fontSize: "13px",
                                        fontWeight: "500"
                                    }}
                                >
                                    {cat.icon} {cat.title}
                                </span>
                            ))
                        ) : (
                            <span style={{ color: "#6b7280" }}>Aucun dossier</span>
                        )}
                    </div>

                    {item.equipiers && item.equipiers.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                            <strong>Équipiers : </strong>
                            {item.equipiers.map((teammate) => (
                                <span
                                    key={teammate}
                                    style={{
                                        backgroundColor: "#e0e0e0",
                                        padding: "4px 10px",
                                        marginRight: "5px",
                                        borderRadius: "15px",
                                        fontSize: "13px"
                                    }}
                                >
                                    {teammate}
                                </span>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: "15px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <strong>Statut :</strong>
                        <select
                            value={item.etat}
                            onChange={(e) => updateItemStatus(item.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                padding: "6px 12px",
                                borderRadius: "6px",
                                border: `2px solid ${getStatusColor(item.etat)}`,
                                backgroundColor: getStatusColor(item.etat) + "20",
                                color: getStatusColor(item.etat),
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            <option value="Nouveau">Nouveau</option>
                            <option value="En attente">En attente</option>
                            <option value="Reussi">Réussi</option>
                            <option value="Abandoné">Abandonné</option>
                        </select>

                        <button
                            onClick={(e) => { e.stopPropagation(); setEditingTask(item); }}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#3B82F6",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            Modifier
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if(window.confirm("Supprimer cette tâche ?")) {
                                    deleteItem(item.id);
                                }
                            }}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#EF4444",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;