import api from './api';

interface NotificationPayload {
    userName: string;
    categoryName: string;
    channelName: string;
    content: string;
    userId: number;
    categoryId: number;
    channelId: number;
}

export const sendNotification = async (payload: NotificationPayload) => {
    try {
        const response = await api.post('/notification/send', payload);
        return response.data;
    } catch (error) {
        console.error('Error sending notification', error);
        throw error;
    }
};

export const fetchMessages = async () => {
    try {
        const response = await api.get('/messages');
        return response.data;
    } catch (error) {
        console.error('Error fetching messages', error);
        throw error;
    }
};
