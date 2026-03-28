function AddTodo({ onAdd, listCat }) {


    function handleAdd(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        onAdd(
            formData.get("title"),
            formData.get("description"),
            formData.get("date_echeance"),
            formData.get("category")
        );

        e.target.reset();
    }

    return (
        <div className="AddTodo">
            <h2>Add a new TODO</h2>
            <form onSubmit={handleAdd}>
                <input
                    name="title"
                    type="text"
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                    placeholder="Enter new TODO"
                    required minLength={5}
                />
                <input
                    name="description"
                    type="text"
                    placeholder="Enter description"
                />
                <input
                    name="date_echeance"
                    type="date"
                />
                <select name="category">
                    <option value="">Select category</option>
                    {listCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.title}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTodo;