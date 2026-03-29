import { useState } from 'react';
import {TitleComponent} from './components/titleComponent/TitleComponent';
import TodoList from './components/todoList/TodoList';
import AddTodo from './components/addTodo/AddTodo';
import CategoryList from './components/categoryList/CategoryList';
import AddCategory from './components/addCategory/AddCategory';
import Header from './components/header/Header';

import data from './data.json';

import './App.css';
import Footer from "./components/footer/Footer";
import EditTodo from "./components/editTodo/EditTodo";

function App() {
    const [list, setList] = useState(data.tasks);
    const [listCategories, setListCategories] = useState(data.categories);
    const [listRelations, setListRelations] = useState(data.relations);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState("tasks");
    const [editingTask, setEditingTask] = useState(null);

    const addItem = (text, description, date, selectedCategoryIds) => {
        if (text.trim() !== "") {
            const newId = Math.max(...list.map(item => item.id)) + 1;

            const newTodo = {
                id: newId,
                title: text,
                description: description,
                etat: "Nouveau",
                date_creation: new Date().toISOString().split('T')[0],
                date_echeance: date
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
    };

    const resetList = () => {
        setList([]);
    }

    const updateItemStatus = (id, newStatus) => {
        const updatedList = list.map(item => {
            if (item.id === id) {
                return { ...item, etat: newStatus };
            }
            return item;
        });
        setList(updatedList);
    };

    const addCategory = (title, description, color) => {
        if (title.trim() !== "") {
            const newId = Math.max(...listCategories.map(item => item.id)) + 1;

            const newCategory = {
                id: newId,
                title: title,
                description: description,
                color: color
            };

            setListCategories([...listCategories, newCategory]);
        }
    }

    const deleteCategory = (id) => {
        const newListCategories = listCategories.filter((cat) => cat.id !== id);
        setListCategories(newListCategories);

        const newListRelations = listRelations.filter((rel) => rel.categorie !== id);
        setListRelations(newListRelations);
    }

    const saveEditedTask = (id, newTitle, newDescription, newDate, selectedCategoryIds) => {
        const updatedList = list.map(item => {
            if (item.id === id) {
                return { ...item, title: newTitle, description: newDescription, date_echeance: newDate };
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
            </div>

            <TitleComponent />

            {currentView === "tasks" && (
                <>
                    <TodoList list={list} listCat={listCategories} listLink={listRelations} onDelete={deleteItem} onReset={resetList} onUpdateStatus={updateItemStatus} onEdit={setEditingTask} />
                    <Footer onOpenModal={() => setIsTaskModalOpen(true)} />
                </>
            )}

            {currentView === "categories" && (
                <>
                    <CategoryList listCat={listCategories} onDeleteCategory={deleteCategory} />
                    <AddCategory onAdd={addCategory} />
                </>
            )}

            {isTaskModalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative" }}>

                        <button
                            onClick={() => setIsTaskModalOpen(false)}
                            style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white" }}
                        >
                            X
                        </button>

                        <AddTodo onAdd={addItem} listCat={listCategories} />

                    </div>
                </div>)}

            {editingTask && (() => {
                const currentCategories = listRelations
                    .filter(rel => rel.tache === editingTask.id)
                    .map(rel => rel.categorie);

                return (
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative" }}>

                            <button onClick={() => setEditingTask(null)} style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white" }}>X</button>

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