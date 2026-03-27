import { useState } from 'react';
import {TitleComponent} from './components/titleComponent/TitleComponent';
import TodoList from './components/todoList/TodoList';
import AddTodo from './components/addTodo/AddTodo';

import data from './data.json';

import './App.css';

function App() {
    const [list, setList] = useState(data.tasks);
    const [listCategories] = useState(data.categories);
    const [listRelations, setListRelations] = useState(data.relations);

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

    return (
        <div className="App">
            <TitleComponent />

            <TodoList list={list} listCat={listCategories} listLink={listRelations} onDelete={deleteItem} onReset={resetList} onUpdateStatus={updateItemStatus} />

            <AddTodo onAdd={addItem} listCat={listCategories} />
        </div>
    );
}

export default App;