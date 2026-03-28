import {useState} from "react";
import Task from "../task/Task";
import Filter from "../filter/Filter";

function TodoList({ list, listCat, listLink, onDelete, onReset, onUpdateStatus  }) {

    const [filterStatus, setFilterStatus] = useState("Tous");

    const [sortCriteria, setSortCriteria] = useState("date_echeance");

    const getCategoriesForTask = (taskId) => {
        const categoryIds = listLink
            .filter(rel => rel.tache === taskId)
            .map(rel => rel.categorie);

        return listCat.filter(cat => categoryIds.includes(cat.id));
    };

    const sortedList = [...list]
        .filter((item) => {
            if (filterStatus === "Tous") {
                return true;
            }
            else if (filterStatus === "Actifs") {
                return item.etat !== "Reussi" && item.etat !== "Abandoné";
            }
            else {
                return item.etat === filterStatus;
            }
        })
        .sort((a, b) => {
            if (sortCriteria === "nom") {
                return a.title.localeCompare(b.title);
            }
            else if (sortCriteria === "date_creation") {
                return new Date(a.date_creation) - new Date(b.date_creation);
            }
            else {
                if (!a.date_echeance) return 1;
                if (!b.date_echeance) return -1;
                return new Date(a.date_echeance) - new Date(b.date_echeance);
            }
        });

    return (
        <div className="TodoList">
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
            >
                <option value="Tous">Tous</option>
                <option value="Actifs">Actifs (En cours)</option>
                <option value="Nouveau">Nouveau</option>
                <option value="En attente">En attente</option>
                <option value="Reussi">Reussi</option>
                <option value="Abandoné">Abandoné</option>
            </select>

            <h2>Your TODO List</h2>
            <button onClick={onReset}>Reset</button>

            <Filter sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />

            <div>
                {sortedList.map((item) => {
                    const categories = getCategoriesForTask(item.id);

                    return (
                        <Task
                            key={item.id}
                            item={item}
                            categories={categories}
                            onUpdateStatus={onUpdateStatus}
                            onDelete={onDelete}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TodoList;