import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Message from '../../models/Message';

interface LogHistoryProps {
    refresh: boolean;
}

const LogHistory: React.FC<LogHistoryProps> = ({ refresh }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get<Message[]>('/messages');
                setMessages(response.data);
            } catch (error) {
                setError('Error fetching messages');
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [refresh]); // Add refresh to dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='log-history'>
            <h1>Log History</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <p><strong>UserName:</strong> {message.userName}</p>
                        <p><strong>Category:</strong> {message.categoryName}</p>
                        <p><strong>Channel:</strong> {message.channelName}</p>
                        <p><strong>Content:</strong> {message.content}</p>
                        <p><strong>Sent At:</strong> {new Date(message.sentAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LogHistory;
