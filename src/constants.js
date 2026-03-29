// États possibles pour une tâche (ENUM)
export const TASK_STATES = {
    NOUVEAU: 'Nouveau',
    EN_ATTENTE: 'En attente',
    REUSSI: 'Reussi',
    ABANDONE: 'Abandoné'
};

export const FOLDER_COLORS = [
    { name: 'Océan', value: '#0EA5E9' },
    { name: 'Forêt', value: '#10B981' },
    { name: 'Lavande', value: '#8B5CF6' },
    { name: 'Corail', value: '#F97316' },
    { name: 'Rose', value: '#EC4899' },
    { name: 'Citron', value: '#EAB308' },
    { name: 'Menthe', value: '#14B8A6' },
    { name: 'Pêche', value: '#FB923C' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Émeraude', value: '#059669' }
];

export const FOLDER_ICONS = [
    '📁', '💼', '🎯', '🚀', '💡', '⚡', '🌟', '🔥',
    '🎨', '📚', '🏆', '💪', '🌱', '🎵', '⚙️', '🎮'
];