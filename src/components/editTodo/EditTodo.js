import { useState } from "react";

function EditTodo({ task, onSave, onCancel, listCat, currentCategories }) {
    const [selectedCats, setSelectedCats] = useState(currentCategories || []);

    const handleCategoryChange = (categoryId) => {
        if (selectedCats.includes(categoryId)) {
            setSelectedCats(selectedCats.filter(id => id !== categoryId));
        } else {
            setSelectedCats([...selectedCats, categoryId]);
        }
    };

    function handleAdd(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        onSave(
            task.id,
            formData.get("title"),
            formData.get("description"),
            formData.get("date_echeance"),
            selectedCats
        );
    }

    return (
        <div className="AddTodo">
            <h2>Modify a Task</h2>
            <form onSubmit={handleAdd}>
                <input name="title" type="text" defaultValue={task.title} required minLength={5} />
                <input name="description" type="text" defaultValue={task.description} />
                <input name="date_echeance" type="date" defaultValue={task.date_echeance} required />

                <div style={{ margin: "15px 0", textAlign: "left" }}>
                    <strong>Catégories :</strong>
                    {listCat.map((cat) => (
                        <label key={cat.id} style={{ display: "block", cursor: "pointer", marginTop: "5px" }}>
                            <input
                                type="checkbox"
                                checked={selectedCats.includes(cat.id)}
                                onChange={() => handleCategoryChange(cat.id)}
                                style={{ marginRight: "10px" }}
                            />
                            {cat.title}
                        </label>
                    ))}
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: "10px", backgroundColor: "gray" }}>Cancel</button>
            </form>
        </div>
    );
}

export default EditTodo;