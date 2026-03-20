import { useState } from 'react';

function AddTodo({ onAdd }) {
    const [text, setText] = useState("");

    const handleAdd = () => {
        onAdd(text);
        setText("");
    };

    return (
        <div className="AddTodo">
            <h2>Add a new TODO</h2>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="Enter new TODO"
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default AddTodo;