import React, { useEffect, useState } from 'react';
import { fetchUsers, User } from '../../services/userService';

interface UserSelectProps {
    onChangeUser: (categoryId: number) => void;
}


const UserSelect: React.FC<UserSelectProps> = ({ onChangeUser }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | ''>('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        setSelectedUser(selectedId);
        onChangeUser(selectedId);
    };


    return (
        <div>
            <label htmlFor="userSelect">User:</label>
            <select id="userSelect" value={selectedUser} onChange={handleSelectChange}>
                <option value="">Select User</option>
                {users.map((user, index) => (
                    <option key={index} value={user.userId}>
                        {user.userName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserSelect;
