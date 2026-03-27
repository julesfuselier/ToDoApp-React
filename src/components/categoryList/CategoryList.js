function CategoryList({listCat, onDeleteCategory}) {
    return (
        <div className="category-list">
            <h2>Categories</h2>
            <p>This section will display the list of categories.</p>
            <ul>
                {listCat.map((cat) => (
                    <li key={cat.id} style={{ color: cat.color }}>
                        <span>{cat.title}</span>
                        <button onClick={() => onDeleteCategory(cat.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;