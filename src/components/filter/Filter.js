function Filter({sortCriteria, setSortCriteria}) {

    return (
        <div className="Tri" style={{ marginBottom: "20px" }}>
            <label>Trier par : </label>
            <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
            >
                <option value="date_echeance">Date d'échéance</option>
                <option value="date_creation">Date de création</option>
                <option value="nom">Nom de la tâche</option>
            </select>
        </div>
    );
}

export default Filter;