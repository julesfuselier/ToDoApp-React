import { TASK_STATES } from './constants';

const STORAGE_KEY = 'todo-app-data';

export const loadData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
    return null;
};

export const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des données:', error);
        return false;
    }
};

export const clearData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Erreur lors de la réinitialisation:', error);
        return false;
    }
};

export const generateId = (existingIds = []) => {
    if (existingIds.length === 0) return 1;
    return Math.max(...existingIds) + 1;
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

export const isExpiredOverOneWeek = (dueDate, currentStatus) => {
    if (currentStatus === TASK_STATES.REUSSI || currentStatus === TASK_STATES.ABANDONE) {
        return false;
    }

    if (!dueDate) return false;

    const today = new Date();
    const due = new Date(dueDate);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    return due < oneWeekAgo;
};

export const isOverdue = (dueDate, currentStatus) => {
    if (currentStatus === TASK_STATES.REUSSI || currentStatus === TASK_STATES.ABANDONE) {
        return false;
    }

    if (!dueDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    return due < today;
};