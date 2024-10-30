import api from './api';
import Category from '../models/Category';

// Fetch from backend
export const fetchCategories = async (userId: number): Promise<Category[]> => {
    try {
        const response = await api.get<Category[]>(`/users/${userId}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

