import "./Footer.css";

function Footer({ onOpenTaskModal, onOpenCategoryModal, currentView }) {
    return (
        <footer className="footer">
            <div className="footer-buttons">
                {currentView === "tasks" && (
                    <button
                        onClick={onOpenTaskModal}
                        className="footer-button task"
                    >
                        + Nouvelle Tâche
                    </button>
                )}

                {currentView === "categories" && (
                    <button
                        onClick={onOpenCategoryModal}
                        className="footer-button category"
                    >
                        + Nouveau Dossier
                    </button>
                )}
            </div>
        </footer>
    );
}

export default Footer;