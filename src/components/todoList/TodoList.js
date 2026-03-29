import { useState } from "react";
import Task from "../task/Task";
import Filter from "../filter/Filter";
import { isExpiredOverOneWeek } from "../../utils";
import { useApp } from '../../contexts/AppContext';

function TodoList() {

    const { list, listCategories: listCat, listRelations: listLink, deleteItem, updateItemStatus, setEditingTask } = useApp();

    const [selectedEtats, setSelectedEtats] = useState(["Nouveau", "En attente"]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("date_echeance");
    const [hideExpiredTasks, setHideExpiredTasks] = useState(true);

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

            let notExpired = true;
            if (hideExpiredTasks) {
                notExpired = !isExpiredOverOneWeek(item.date_echeance, item.etat);
            }

            return matchEtat && matchCat && notExpired;
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

            <h2>Vos Tâches ({sortedList.length})</h2>

            <Filter
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
                selectedEtats={selectedEtats}
                setSelectedEtats={setSelectedEtats}
                listCat={listCat}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                hideExpiredTasks={hideExpiredTasks}
                setHideExpiredTasks={setHideExpiredTasks}
            />

            <div style={{ paddingBottom: '100px' }}>
                {sortedList.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '10px',
                        color: '#6b7280'
                    }}>
                        <p style={{ fontSize: '18px' }}>Aucune tâche correspondante</p>
                        <p>Modifiez vos filtres ou créez une nouvelle tâche</p>
                    </div>
                ) : (
                    sortedList.map((item) => {
                        const categories = getCategoriesForTask(item.id);

                        return (
                            <Task
                                key={item.id}
                                item={item}
                                categories={categories}
                                updateItemStatus={updateItemStatus}
                                deleteItem={deleteItem}
                                setEditingTask={setEditingTask}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default TodoList;