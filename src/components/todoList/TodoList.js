import {useState} from "react";
import Task from "../task/Task";
import Filter from "../filter/Filter";

function TodoList({ list, listCat, listLink, onDelete, onReset, onUpdateStatus, onEdit  }) {

    const [selectedEtats, setSelectedEtats] = useState(["Nouveau", "En attente"]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [sortCriteria, setSortCriteria] = useState("date_echeance");

    const getCategoriesForTask = (taskId) => {
        const categoryIds = listLink
            .filter(rel => rel.tache === taskId)
            .map(rel => rel.categorie);

        return listCat.filter(cat => categoryIds.includes(cat.id));
    };

    const sortedList = [...list]
        .filter((item) => {
            let matchEtat = true;
            if (selectedEtats.length > 0) {
                matchEtat = selectedEtats.includes(item.etat);
            }

            let matchCat = true;
            if (selectedCategories.length > 0) {
                const itemCatIds = getCategoriesForTask(item.id).map(c => c.id);
                matchCat = selectedCategories.some(catId => itemCatIds.includes(catId));
            }

            return matchEtat && matchCat;
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

            <h2>Your TODO List</h2>
            <button onClick={onReset}>Reset</button>

            <Filter
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
                selectedEtats={selectedEtats}
                setSelectedEtats={setSelectedEtats}
                listCat={listCat}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />

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
                            onEdit={onEdit}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TodoList;