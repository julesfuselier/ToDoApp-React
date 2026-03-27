function AddCategory({onAdd}) {

    function handleAdd(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        onAdd(
            formData.get("title"),
            formData.get("description"),
            formData.get("color")
        );

        e.target.reset();
    }

    return (
        <div className="AddCategory">
            <h2>Add a new Category</h2>
            <form onSubmit={handleAdd}>
                <input
                    name="title"
                    type="text"
                    placeholder="Enter new category"
                />
                <input
                    name="description"
                    type="text"
                    placeholder="Enter description"
                />
                <input
                    name="color"
                    type="color"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddCategory;