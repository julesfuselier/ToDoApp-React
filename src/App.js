import { useState } from 'react';
import {TitleComponent} from './components/TitleComponent';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

import data from './data.json'

import './App.css';

function App() {
    const [list, setList] = useState(data.tasks);

    const addItem = (text) => {
        if (text.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                title: text,
                completed: false
            };
            setList([...list, newTodo]);
        }
    };

    const deleteItem = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
    };


    return (
        <div className="App">
            <TitleComponent />

            <TodoList list={list} onDelete={deleteItem} />

            <AddTodo onAdd={addItem} />
        </div>
    );
}

export default App;