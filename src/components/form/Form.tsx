import React, { useState } from 'react';
import api from '../../services/api';
import CategorySelect from '../categorySelector/categorySelector';
import UserSelect from '../userSelector/UserSelect';
import Category from '../../models/Category';
import NotificationPayload from '../../models/NotificationPayload';
import { validateCategoryId, validateUserId, validateContent } from '../../shared/validation';
import User from '../../models/User';
import SendButton from '../button/sendButton';
import LogHistory from '../logHistory/LogHistory';

const Form: React.FC = () => {
    const [categoryId, setCategory] = useState<number | 0>(0);
    const [userId, setUserId] = useState<number | 0>(0);
    const [userName, setUserName] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [refreshLogHistory, setRefreshLogHistory] = useState<boolean>(false);

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
            setRefreshLogHistory(!refreshLogHistory); // Refresh LogHistory
            /*
            if (response.data) {
                setResponseMessage('Notification sent successfully!');
                setRefreshLogHistory(!refreshLogHistory); // Refresh LogHistory
            } else {
                setResponseMessage('Failed to send notification.');
            }
                */
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
        <div className="form-container">
            <h1 className="form-header">Send Notification</h1>
            <div className="form-group">
                <UserSelect onChangeUser={handleUserChange} />
            </div>
            <div className="form-group">
                <CategorySelect onCategoryChange={handleCategoryChange} userId={userId} />
            </div>
            <div className="form-group">
                <textarea
                    className="textarea"
                    placeholder="Message Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <div className="button-container">
                <SendButton
                    onClick={handleSend}
                    disabled={userId === 0 || categoryId === 0 || content.trim() === ''}
                />
            </div>
            {responseMessage && (
                <p className={responseMessage.includes('Error') ? 'error-message' : 'message'}>
                    {responseMessage}
                </p>
            )}
            <LogHistory refresh={refreshLogHistory} />
    </div>
    );
};

export default Form;
