function TodoList({ list, listCat, listLink, onDelete, onReset  }) {

    const getCategoriesForTask = (taskId) => {
        const categoryIds = listLink
            .filter(rel => rel.tache === taskId)
            .map(rel => rel.categorie);

        return listCat.filter(cat => categoryIds.includes(cat.id));
    };

    const sortedList = [...list]
        .filter(item => !["Reussi", "Abandoné"].includes(item.etat))
        .sort((a, b) => {
            if (!a.date_echeance) return 1;
            if (!b.date_echeance) return -1;

            return new Date(a.date_echeance) - new Date(b.date_echeance);
        });

    return (
        <div className="TodoList">
            <h2>Your TODO List</h2>
            <button onClick={onReset}>Reset</button>
            <ul>
                {sortedList
                    .map((item) => {
                        const categories = getCategoriesForTask(item.id);

                        return (
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <span>{item.etat}</span>

                                <span>{item.date_creation} - {item.date_echeance}</span>

                                <div>
                                    {categories.map(cat => (
                                        <span
                                            key={cat.id}
                                            style={{
                                                backgroundColor: cat.color,
                                                padding: "2px 6px",
                                                margin: "2px",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            {cat.title}
                                        </span>
                                    ))}
                                </div>

                                <button onClick={() => onDelete(item.id)}>
                                    Remove
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default TodoList;