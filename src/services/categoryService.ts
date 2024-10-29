import api from './api'

export interface Category {
    id: number;
    name: string;
    displayName: string;
}

// Fetch from backend
export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await api.get<Category[]>('/categories'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
