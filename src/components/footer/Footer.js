import "./Footer.css";
import { useApp } from '../../contexts/AppContext';

function Footer() {
    const { currentView, setIsTaskModalOpen, setIsCategoryModalOpen } = useApp();

    return (
        <footer className="footer">
            <div className="footer-buttons">
                {currentView === "tasks" && (
                    <button
                        onClick={() => setIsTaskModalOpen(true)}
                        className="footer-button task"
                    >
                        + Nouvelle Tâche
                    </button>
                )}

                {currentView === "categories" && (
                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
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