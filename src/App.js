import { useState, useEffect } from 'react';
import { TitleComponent } from './components/titleComponent/TitleComponent';
import TodoList from './components/todoList/TodoList';
import AddTodo from './components/addTodo/AddTodo';
import CategoryList from './components/categoryList/CategoryList';
import AddCategory from './components/addCategory/AddCategory';
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import EditTodo from "./components/editTodo/EditTodo";

import initialData from './data.json';
import { loadData, saveData, clearData, generateId } from './utils';
import './App.css';

function App() {
    const [list, setList] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [listRelations, setListRelations] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState("tasks");
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const savedData = loadData();
        if (savedData) {
            setList(savedData.tasks || []);
            setListCategories(savedData.categories || []);
            setListRelations(savedData.relations || []);
        } else {
            setList(initialData.tasks || []);
            setListCategories(initialData.categories || []);
            setListRelations(initialData.relations || []);
        }
    }, []);

    useEffect(() => {
        if (list.length > 0 || listCategories.length > 0) {
            saveData({
                tasks: list,
                categories: listCategories,
                relations: listRelations
            });
        }
    }, [list, listCategories, listRelations]);

    const addItem = (text, description, date, selectedCategoryIds, teammates) => {
        if (text.trim() !== "") {
            const newId = generateId(list.map(item => item.id));

            const newTodo = {
                id: newId,
                title: text,
                description: description,
                etat: "Nouveau",
                date_creation: new Date().toISOString().split('T')[0],
                date_echeance: date,
                equipiers: teammates || []
            };

            setList([...list, newTodo]);

            if (selectedCategoryIds && selectedCategoryIds.length > 0) {
                const newRelations = selectedCategoryIds.map(catId => ({
                    tache: newId,
                    categorie: parseInt(catId)
                }));

                setListRelations([...listRelations, ...newRelations]);
            }
        }
        setIsTaskModalOpen(false);
    };

    const deleteItem = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);

        const newRelations = listRelations.filter(rel => rel.tache !== id);
        setListRelations(newRelations);
    };

    const resetList = () => {
        if (window.confirm('Êtes-vous sûr(e) de vouloir réinitialiser toutes les données ? Cette action est irréversible !')) {
            clearData();
            setList(initialData.tasks || []);
            setListCategories(initialData.categories || []);
            setListRelations(initialData.relations || []);
        }
    };

    const updateItemStatus = (id, newStatus) => {
        const updatedList = list.map(item => {
            if (item.id === id) {
                return { ...item, etat: newStatus };
            }
            return item;
        });
        setList(updatedList);
    };

    const addCategory = (title, description, color, icon) => {
        if (title.trim() !== "") {
            const newId = generateId(listCategories.map(item => item.id));

            const newCategory = {
                id: newId,
                title: title,
                description: description,
                color: color,
                icon: icon || '📁'
            };

            setListCategories([...listCategories, newCategory]);
        }
    };

    const deleteCategory = (id) => {
        if (window.confirm('Supprimer ce dossier ? Les tâches associées ne seront pas supprimées.')) {
            const newListCategories = listCategories.filter((cat) => cat.id !== id);
            setListCategories(newListCategories);

            const newListRelations = listRelations.filter((rel) => rel.categorie !== id);
            setListRelations(newListRelations);
        }
    };

    const saveEditedTask = (id, newTitle, newDescription, newDate, selectedCategoryIds, teammates) => {
        const updatedList = list.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    title: newTitle,
                    description: newDescription,
                    date_echeance: newDate,
                    equipiers: teammates || []
                };
            }
            return item;
        });
        setList(updatedList);

        let updatedRelations = listRelations.filter(rel => rel.tache !== id);

        selectedCategoryIds.forEach(catId => {
            updatedRelations.push({
                tache: id,
                categorie: parseInt(catId)
            });
        });

        setListRelations(updatedRelations);
        setEditingTask(null);
    };

    return (
        <div className="App">
            <Header list={list} />

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
                <button
                    onClick={() => setCurrentView("tasks")}
                    style={{ fontWeight: currentView === "tasks" ? "bold" : "normal" }}
                >
                    Voir les Tâches
                </button>
                <button
                    onClick={() => setCurrentView("categories")}
                    style={{ fontWeight: currentView === "categories" ? "bold" : "normal" }}
                >
                    Voir les Dossiers
                </button>
                <button
                    onClick={resetList}
                    style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                >
                    Reset
                </button>
            </div>

            <TitleComponent />

            {currentView === "tasks" && (
                <>
                    <TodoList
                        list={list}
                        listCat={listCategories}
                        listLink={listRelations}
                        onDelete={deleteItem}
                        onReset={resetList}
                        onUpdateStatus={updateItemStatus}
                        onEdit={setEditingTask}
                    />
                </>
            )}

            {currentView === "categories" && (
                <>
                    <CategoryList listCat={listCategories} onDeleteCategory={deleteCategory} />
                </>
            )}

            <Footer
                onOpenTaskModal={() => setIsTaskModalOpen(true)}
                onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
                currentView={currentView}
            />

            {isTaskModalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
                }}>
                    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative", maxWidth: "500px", width: "90%" }}>
                        <button
                            onClick={() => setIsTaskModalOpen(false)}
                            style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            ✕
                        </button>
                        <AddTodo onAdd={addItem} listCat={listCategories} />
                    </div>
                </div>
            )}

            {isCategoryModalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
                }}>
                    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative", maxWidth: "600px", width: "90%", maxHeight: '90vh', overflowY: 'auto' }}>
                        <button
                            onClick={() => setIsCategoryModalOpen(false)}
                            style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            ✕
                        </button>
                        <AddCategory onAdd={addCategory} onClose={() => setIsCategoryModalOpen(false)} />
                    </div>
                </div>
            )}

            {editingTask && (() => {
                const currentCategories = listRelations
                    .filter(rel => rel.tache === editingTask.id)
                    .map(rel => rel.categorie);

                return (
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative", maxWidth: "500px", width: "90%" }}>
                            <button onClick={() => setEditingTask(null)} style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>✕</button>
                            <EditTodo
                                task={editingTask}
                                onSave={saveEditedTask}
                                onCancel={() => setEditingTask(null)}
                                listCat={listCategories}
                                currentCategories={currentCategories}
                            />
                        </div>
                    </div>
                );
            })()}

        </div>
    );
}

export default App;