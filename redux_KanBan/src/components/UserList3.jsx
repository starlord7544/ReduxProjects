import { useEffect, useState } from 'react';
import api from '../api';

const UserList = ({ taskId, assignedUsers, onAssign }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(new Set(assignedUsers || []));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.getAllUsers();
                setUsers(response.data.users);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleUserSelect = async (userId) => {
        const updatedSelectedUsers = new Set(selectedUsers);
        if (updatedSelectedUsers.has(userId)) {
            updatedSelectedUsers.delete(userId);
        } else {
            updatedSelectedUsers.add(userId);
        }
        setSelectedUsers(updatedSelectedUsers);

        try {
            await api.assignUsers(taskId, Array.from(updatedSelectedUsers));
            onAssign(Array.from(updatedSelectedUsers));
        } catch (err) {
            setError('Failed to assign users');
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h3>Assign Users</h3>
            {users.length === 0 ? (
                <p>No registered users found</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.has(user.id)}
                                    onChange={() => handleUserSelect(user.id)}
                                />
                                {user.username}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
