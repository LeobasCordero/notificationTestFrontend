import api from './api'

export interface User {
    userName: string;
    userId: number;
}

// Fetch from backend
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get<User[]>('/users'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
