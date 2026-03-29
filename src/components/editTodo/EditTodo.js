import { useState } from "react";

function EditTodo({ task, onSave, onCancel, listCat, currentCategories }) {
    const [selectedCats, setSelectedCats] = useState(currentCategories || []);
    const [teammates, setTeammates] = useState(task.equipiers || []);
    const [teammateInput, setTeammateInput] = useState("");

    const handleCategoryChange = (categoryId) => {
        if (selectedCats.includes(categoryId)) {
            setSelectedCats(selectedCats.filter(id => id !== categoryId));
        } else {
            setSelectedCats([...selectedCats, categoryId]);
        }
    };

    const addTeammate = () => {
        const name = teammateInput.trim();
        if (name && !teammates.includes(name)) {
            setTeammates([...teammates, name]);
            setTeammateInput("");
        }
    };

    const removeTeammate = (name) => {
        setTeammates(teammates.filter(t => t !== name));
    };

    const handleTeammateKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTeammate();
        }
    };

    function handleSave(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        onSave(
            task.id,
            formData.get("title"),
            formData.get("description"),
            formData.get("date_echeance"),
            selectedCats,
            teammates
        );
    }

    return (
        <div className="EditTodo">
            <h2>Modifier la tâche</h2>
            <form onSubmit={handleSave}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Titre <span style={{ color: 'red' }}>*</span></label>
                    <input
                        name="title"
                        type="text"
                        defaultValue={task.title}
                        required
                        minLength={5}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        defaultValue={task.description}
                        rows="3"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Date d'échéance <span style={{ color: 'red' }}>*</span></label>
                    <input
                        name="date_echeance"
                        type="date"
                        defaultValue={task.date_echeance}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px', textAlign: "left" }}>
                    <label><strong>Catégories :</strong></label>
                    <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '5px' }}>
                        {listCat.map((cat) => (
                            <label key={cat.id} style={{ display: "block", cursor: "pointer", marginBottom: "5px" }}>
                                <input
                                    type="checkbox"
                                    checked={selectedCats.includes(cat.id)}
                                    onChange={() => handleCategoryChange(cat.id)}
                                    style={{ marginRight: "10px" }}
                                />
                                {cat.icon} {cat.title}
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label><strong>Équipiers :</strong></label>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <input
                            type="text"
                            value={teammateInput}
                            onChange={(e) => setTeammateInput(e.target.value)}
                            onKeyDown={handleTeammateKeyDown}
                            placeholder="Nom de l'équipier"
                            style={{ flex: 1, padding: '8px' }}
                        />
                        <button
                            type="button"
                            onClick={addTeammate}
                            disabled={!teammateInput.trim()}
                            style={{ padding: '8px 16px', cursor: 'pointer' }}
                        >
                            + Ajouter
                        </button>
                    </div>
                    {teammates.length > 0 && (
                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {teammates.map((teammate, index) => (
                                <span
                                    key={index}
                                    style={{
                                        backgroundColor: '#e0e0e0',
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    {teammate}
                                    <button
                                        type="button"
                                        onClick={() => removeTeammate(teammate)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'red',
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Enregistrer
                    </button>
                    <button type="button" onClick={onCancel} style={{ flex: 1, padding: '12px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTodo;