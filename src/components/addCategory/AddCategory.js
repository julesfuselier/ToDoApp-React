import { useState } from "react";
import { FOLDER_COLORS, FOLDER_ICONS } from "../../constants";
import "./AddCategory.css";

function AddCategory({ onAdd, onClose }) {
    const [selectedColor, setSelectedColor] = useState(FOLDER_COLORS[0].value);
    const [selectedIcon, setSelectedIcon] = useState(FOLDER_ICONS[0]);

    function handleAdd(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        onAdd(
            formData.get("title"),
            formData.get("description"),
            selectedColor,
            selectedIcon
        );

        e.target.reset();
        setSelectedColor(FOLDER_COLORS[0].value);
        setSelectedIcon(FOLDER_ICONS[0]);

        if (onClose) onClose();
    }

    return (
        <div className="AddCategory">
            <h2>Ajouter un nouveau dossier</h2>
            <form onSubmit={handleAdd}>
                <div className="form-group">
                    <label>
                        Titre <span className="required">*</span>
                    </label>
                    <input
                        name="title"
                        type="text"
                        required
                        minLength={3}
                        placeholder="Nom du dossier (min. 3 caractères)"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Description du dossier..."
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label>Couleur</label>
                    <div className="color-grid">
                        {FOLDER_COLORS.map((color) => (
                            <button
                                key={color.value}
                                type="button"
                                onClick={() => setSelectedColor(color.value)}
                                className={`color-button ${selectedColor === color.value ? 'selected' : ''}`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            >
                                {selectedColor === color.value && <span className="check">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Pictogramme</label>
                    <div className="icon-grid">
                        {FOLDER_ICONS.map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => setSelectedIcon(icon)}
                                className={`icon-button ${selectedIcon === icon ? 'selected' : ''}`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Créer le dossier
                </button>
            </form>
        </div>
    );
}

export default AddCategory;