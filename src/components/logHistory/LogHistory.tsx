import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Message {
    userName: string;
    categoryName: string;
    channelName: string;
    content: string;
    sentAt: string;
}

const LogHistory: React.FC = () => {
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
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
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
