import { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data.json';
import { loadData, saveData, clearData, generateId } from '../utils';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp doit être utilisé dans AppProvider');
    }
    return context;
};

// Provider qui enveloppe toute l'app
export const AppProvider = ({ children }) => {
    const [list, setList] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [listRelations, setListRelations] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState("tasks");
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const savedData = loadData();
        if (savedData) {
            setList(savedData.tasks || []);
            setListCategories(savedData.categories || []);
            setListRelations(savedData.relations || []);
        } else {
            setList(initialData.tasks || []);
            setListCategories(initialData.categories || []);
            setListRelations(initialData.relations || []);
        }
    }, []);

    useEffect(() => {
        if (list.length > 0 || listCategories.length > 0) {
            saveData({
                tasks: list,
                categories: listCategories,
                relations: listRelations
            });
        }
    }, [list, listCategories, listRelations]);

    const addItem = (text, description, date, selectedCategoryIds, teammates) => {
        if (text.trim() !== "") {
            const newId = generateId(list.map(item => item.id));

            const newTodo = {
                id: newId,
                title: text,
                description: description,
                etat: "Nouveau",
                date_creation: new Date().toISOString().split('T')[0],
                date_echeance: date,
                equipiers: teammates || []
            };

            setList([...list, newTodo]);

            if (selectedCategoryIds && selectedCategoryIds.length > 0) {
                const newRelations = selectedCategoryIds.map(catId => ({
                    tache: newId,
                    categorie: parseInt(catId)
                }));

                setListRelations([...listRelations, ...newRelations]);
            }
        }
        setIsTaskModalOpen(false);
    };

    const deleteItem = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);

        const newRelations = listRelations.filter(rel => rel.tache !== id);
        setListRelations(newRelations);
    };

    const resetList = () => {
        if (window.confirm('Êtes-vous sûr(e) de vouloir réinitialiser toutes les données ? Cette action est irréversible !')) {
            clearData();
            setList(initialData.tasks || []);
            setListCategories(initialData.categories || []);
            setListRelations(initialData.relations || []);
        }
    };

    const updateItemStatus = (id, newStatus) => {
        const updatedList = list.map(item => {
            if (item.id === id) {
                return { ...item, etat: newStatus };
            }
            return item;
        });
        setList(updatedList);
    };

    const addCategory = (title, description, color, icon) => {
        if (title.trim() !== "") {
            const newId = generateId(listCategories.map(item => item.id));

            const newCategory = {
                id: newId,
                title: title,
                description: description,
                color: color,
                icon: icon || '📁'
            };

            setListCategories([...listCategories, newCategory]);
        }
    };

    const deleteCategory = (id) => {
        if (window.confirm('Supprimer ce dossier ? Les tâches associées ne seront pas supprimées.')) {
            const newListCategories = listCategories.filter((cat) => cat.id !== id);
            setListCategories(newListCategories);

            const newListRelations = listRelations.filter((rel) => rel.categorie !== id);
            setListRelations(newListRelations);
        }
    };

    const saveEditedTask = (id, newTitle, newDescription, newDate, selectedCategoryIds, teammates) => {
        const updatedList = list.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    title: newTitle,
                    description: newDescription,
                    date_echeance: newDate,
                    equipiers: teammates || []
                };
            }
            return item;
        });
        setList(updatedList);

        let updatedRelations = listRelations.filter(rel => rel.tache !== id);

        selectedCategoryIds.forEach(catId => {
            updatedRelations.push({
                tache: id,
                categorie: parseInt(catId)
            });
        });

        setListRelations(updatedRelations);
        setEditingTask(null);
    };

    const value = {
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
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};