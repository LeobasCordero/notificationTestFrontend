import React, { useState } from 'react';
import api from '../../services/api';
import LogHistory from '../logHistory/LogHistory';
import CategorySelect from '../categorySelector/categorySelector';
import UserSelect from '../userSelector/UserSelect';

interface NotificationPayload {
    categoryName: string;
    channelName: string;
    content: string;
    sentAt: string;
    userId: number;
    categoryId: number;
}

const Form: React.FC = () => {
    const [category, setCategory] = useState<number | ''>('');
    const [userID, setUser] = useState<number | ''>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [channelName, setChannelName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string>('');

    const handleSend = async () => {
        const payload: NotificationPayload = {
            categoryName,
            channelName,
            content,
            sentAt: new Date().toISOString(),
            userId: 0,
            categoryId: 0
        };

        try {
            const response = await api.post<boolean>('/notification/send', payload);
            if (response.data) {
                setResponseMessage('Notification sent successfully!');
            } else {
                setResponseMessage('Failed to send notification.');
            }
        } catch (error) {
            setResponseMessage('Error sending notification.');
            console.error('Error:', error);
        }
    };

    const handleCategoryChange = (categoryId: number) => {
        setCategory(categoryId);
    };

    const handleUserChange = (userId: number) => {
        setUser(userId);
    };

    return (
        <div>
            <h1>Send Notification</h1>
            <UserSelect onChangeUser={handleUserChange}/>
            <CategorySelect onCategoryChange={handleCategoryChange} />
            <textarea
                placeholder="Message Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button onClick={handleSend}>Send</button>
            {responseMessage && <p>{responseMessage}</p>}
            <LogHistory />
        </div>
    );
};

export default Form;
