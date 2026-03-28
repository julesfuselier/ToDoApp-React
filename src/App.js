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

function App() {
    const [list, setList] = useState(data.tasks);
    const [listCategories, setListCategories] = useState(data.categories);
    const [listRelations, setListRelations] = useState(data.relations);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const addItem = (text, description, date, categoryId) => {
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

            if (categoryId) {
                const newRelation = {
                    tache: newId,
                    categorie: parseInt(categoryId)
                };

                setListRelations([...listRelations, newRelation]);
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

    return (
        <div className="App">
            <Header list={list} />

            <TitleComponent />

            <TodoList list={list} listCat={listCategories} listLink={listRelations} onDelete={deleteItem} onReset={resetList} onUpdateStatus={updateItemStatus} />

            <AddTodo onAdd={addItem} listCat={listCategories} />

            <CategoryList listCat={listCategories} onDeleteCategory={deleteCategory} />
            <AddCategory onAdd={addCategory} />

            <Footer onOpenModal={() => setIsTaskModalOpen(true)} />

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

        </div>
    );
}

export default App;