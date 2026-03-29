import { useApp } from '../../contexts/AppContext';

function CategoryList() {

    const { listCategories: listCat, deleteCategory } = useApp();
    return (
        <div className="category-list">
            <h2>Categories</h2>
            <p>This section will display the list of categories.</p>
            <ul>
                {listCat.map((cat) => (
                    <li key={cat.id} style={{ color: cat.color }}>
                        <span>{cat.title}</span>
                        <button onClick={() => deleteCategory(cat.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;