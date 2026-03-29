function Filter({ sortCriteria, setSortCriteria, selectedEtats, setSelectedEtats, listCat, selectedCategories, setSelectedCategories }) {

    const etatsDisponibles = ["Nouveau", "En attente", "Reussi", "Abandoné"];

    const toggleEtat = (etat) => {
        if (selectedEtats.includes(etat)) {
            setSelectedEtats(selectedEtats.filter(e => e !== etat));
        } else {
            setSelectedEtats([...selectedEtats, etat]);
        }
    };

    const toggleCategory = (catId) => {
        if (selectedCategories.includes(catId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== catId));
        } else {
            setSelectedCategories([...selectedCategories, catId]);
        }
    };

    return (
        <div className="Filter" style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h3>Filtres et Tris</h3>

            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                <div>
                    <strong>Trier par : </strong>
                    <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
                        <option value="date_echeance">Date d'échéance</option>
                        <option value="date_creation">Date de création</option>
                        <option value="nom">Nom de la tâche</option>
                    </select>
                </div>

                <div>
                    <strong>États : </strong>
                    {etatsDisponibles.map(etat => (
                        <label key={etat} style={{ marginRight: "10px", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={selectedEtats.includes(etat)}
                                onChange={() => toggleEtat(etat)}
                            />
                            {etat}
                        </label>
                    ))}
                </div>

                <div>
                    <strong>Dossiers : </strong>
                    {listCat.map(cat => (
                        <label key={cat.id} style={{ marginRight: "10px", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.id)}
                                onChange={() => toggleCategory(cat.id)}
                            />
                            {cat.title}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filter;