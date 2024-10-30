import React, { useState } from 'react';
import api from '../../services/api';
import CategorySelect from '../categorySelector/categorySelector';
import UserSelect from '../userSelector/UserSelect';
import Category from '../../models/Category';
import NotificationPayload from '../../models/NotificationPayload';
import { validateCategoryId, validateUserId, validateContent } from '../../shared/validation'
import User from '../../models/User';
import SendButton from '../button/sendButton';

const Form: React.FC = () => {
    const [categoryId, setCategory] = useState<number | 0>(0);
    const [userId, setUserId] = useState<number | 0>(0);
    const [userName, setUserName] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string>('');

    const validateFields = (): boolean => {
        const categoryError = validateCategoryId(categoryId);
        if (categoryError) {
            setResponseMessage(categoryError);
            return false;
        }

        const userError = validateUserId(userId);
        if (userError) {
            setResponseMessage(userError);
            return false;
        }

        const contentError = validateContent(content);
        if (contentError) {
            setResponseMessage(contentError);
            return false;
        }

        return true;
    };

    const handleSend = async () => {
        if (!validateFields()) {
            return;
        }

        const payload: NotificationPayload = {
            categoryName,
            content,
            userId,
            categoryId,
            userName
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

    const handleCategoryChange = (category: Category) => {
        setCategoryName(category.name);
        setCategory(category.id);
    };

    const handleUserChange = (user: User) => {
        setUserId(user.userId);
        setUserName(user.userName);
    };


    return (
        <div>
            <h1>Send Notification</h1>
            <UserSelect onChangeUser={handleUserChange} />
            <CategorySelect onCategoryChange={handleCategoryChange} userId={userId} />
            <textarea
                placeholder="Message Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <SendButton
                onClick={handleSend}
                disabled={userId === 0 || categoryId === 0 || content.trim() === ''}
            />
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Form;
