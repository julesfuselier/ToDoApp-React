import { TitleComponent } from './components/titleComponent/TitleComponent';
import TodoList from './components/todoList/TodoList';
import AddTodo from './components/addTodo/AddTodo';
import CategoryList from './components/categoryList/CategoryList';
import AddCategory from './components/addCategory/AddCategory';
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import EditTodo from "./components/editTodo/EditTodo";
import { useApp } from './contexts/AppContext';
import './App.css';

function App() {
    const {
        list,
        listCategories,
        listRelations,
        isTaskModalOpen,
        isCategoryModalOpen,
        currentView,
        editingTask,
        setIsTaskModalOpen,
        setIsCategoryModalOpen,
        setCurrentView,
        setEditingTask,
        addItem,
        deleteItem,
        resetList,
        updateItemStatus,
        addCategory,
        deleteCategory,
        saveEditedTask
    } = useApp();

    return (
        <div className="App">
            <Header />

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
                <button
                    onClick={() => setCurrentView("tasks")}
                    style={{ fontWeight: currentView === "tasks" ? "bold" : "normal" }}
                >
                    Voir les Tâches
                </button>
                <button
                    onClick={() => setCurrentView("categories")}
                    style={{ fontWeight: currentView === "categories" ? "bold" : "normal" }}
                >
                    Voir les Dossiers
                </button>
                <button
                    onClick={resetList}
                    style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                >
                    Reset
                </button>
            </div>

            <TitleComponent />

            {currentView === "tasks" && (
                <TodoList />
            )}

            {currentView === "categories" && (
                <CategoryList />
            )}

            <Footer />

            {isTaskModalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
                }}>
                    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative", maxWidth: "500px", width: "90%" }}>
                        <button
                            onClick={() => setIsTaskModalOpen(false)}
                            style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            ✕
                        </button>
                        <AddTodo />
                    </div>
                </div>
            )}

            {isCategoryModalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
                }}>
                    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative", maxWidth: "600px", width: "90%", maxHeight: '90vh', overflowY: 'auto' }}>
                        <button
                            onClick={() => setIsCategoryModalOpen(false)}
                            style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            ✕
                        </button>
                        <AddCategory />
                    </div>
                </div>
            )}

            {editingTask && (() => {
                const currentCategories = listRelations
                    .filter(rel => rel.tache === editingTask.id)
                    .map(rel => rel.categorie);

                return (
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", position: "relative", maxWidth: "500px", width: "90%" }}>
                            <button onClick={() => setEditingTask(null)} style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>✕</button>
                            <EditTodo
                                task={editingTask}
                                currentCategories={currentCategories}
                            />
                        </div>
                    </div>
                );
            })()}

        </div>
    );
}

export default App;