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
    
    const formatDateArray = (dateArray: number[]) => {
        const [year, month, day, hour, minute, second] = dateArray;
        return new Date(Date.UTC(year, month-1, day, hour, minute, second));
    };
    
    const formatDateForDisplay = (date: Date): string => {
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'UTC'
        });
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get<Message[]>('/messages');
                
                const sortedMessages = response.data.sort((a, b) =>
                    formatDateArray(b.sentAt).getTime() - formatDateArray(a.sentAt).getTime()
                );

                setMessages(sortedMessages);
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
            <table className='log-table'>
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Category</th>
                        <th>Channel</th>
                        <th>Content</th>
                        <th>Sent At</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message, index) => (
                        <tr key={index}>
                            <td>{message.userName}</td>
                            <td>{message.categoryName}</td>
                            <td>{message.channelName}</td>
                            <td>{message.content}</td>
                            <td>{formatDateForDisplay(formatDateArray(message.sentAt))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogHistory;
