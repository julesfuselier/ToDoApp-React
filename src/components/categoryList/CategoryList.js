import { useApp } from '../../contexts/AppContext';
import './CategoryList.css';

function CategoryList() {
    const { listCategories: listCat, deleteCategory } = useApp();

    return (
        <div className="category-list-container">
            {listCat.map((cat) => (
                <div key={cat.id} className="category-card">

                    <div className="category-info">
                        <div
                            className="category-color-dot"
                            style={{ backgroundColor: cat.color || '#8DA392' }}
                        ></div>
                        <div className="category-text">
                            <h3>{cat.title}</h3>
                        </div>
                    </div>

                    <div className="category-actions">
                        <button onClick={() => deleteCategory(cat.id)}>Supprimer</button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default CategoryList;