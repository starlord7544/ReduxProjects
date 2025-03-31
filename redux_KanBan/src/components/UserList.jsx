import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateAssignedUsers } from '../store/features/kanban/KanbanSlice';
import api from '../api';

const UserList = ({ taskId, initialAssigned, category }) => {
    const [allUsers, setAllUsers] = useState([]);
    // const [selectedUsers, setSelectedUsers] = useState(initialAssigned || []);
    const [selectedUsers, setSelectedUsers] = useState(
        initialAssigned?.map(u => u._id) || []
    )
    const [searchInput, setSearchInput] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.getAllUsers()
                setAllUsers(res.data.users)
                // console.log(res.data.users)
            } catch (err) {
                console.error('Failed to fetch users : ', err)
            }
        }
        fetchUsers()
    }, [])

    const handleChange = async (userId) => {
        try {
            const newSelectedUsers = selectedUsers.includes(userId)
                ? selectedUsers.filter(id => id !== userId) : [...selectedUsers, userId]

            const res = await api.assignUsers(taskId, newSelectedUsers)

            if (!res || !res.task)
                throw new Error('Invalid server response');

            const { task } = res
            const assignedIds = task.assignedTo.map(u => u._id)
            const assignedUsers = task.assignedTo.map(user => ({
                _id: user._id,
                username: user.username
            }))

            setSelectedUsers(assignedIds)
            dispatch(updateAssignedUsers({
                taskId,
                category,
                assignedTo: assignedUsers
            }))
        } catch (err) {
            console.error('Assignment failed:', err);
            setSelectedUsers([...selectedUsers])
        }
    }

    return (
        <div className='user-list'>
            <input
                type="text"
                placeholder='Search users...'
                autoFocus
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <p></p>
            {
                allUsers.filter(
                    user => user.username.toLowerCase().includes(searchInput.toLowerCase())
                ).map(user => (
                    <div
                        className='user-name'
                        key={user._id}
                        onClick={() => handleChange(user._id)}
                    >
                        <input
                            type="checkbox"
                            id={user._id}
                            checked={selectedUsers.includes(user._id)}
                            onChange={() => handleChange(user._id)}
                        />
                        <label htmlFor={user._id}>
                            {user.username}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}

export default UserList

const assigned = [
    {
        username: 'sid',
        isChecked: true,
        _id: '1'
    },
    {
        username: 'alex',
        isChecked: false,
        _id: '2'
    },
    {
        username: 'john',
        isChecked: true,
        _id: '3'
    },
    {
        username: 'emma',
        isChecked: false,
        _id: '4'
    },
    {
        username: 'oliver',
        isChecked: false,
        _id: '5'
    },
    {
        username: 'sophia',
        isChecked: false,
        _id: '6'
    },
    {
        username: 'michael',
        isChecked: false,
        _id: '7'
    },
    {
        username: 'lucas',
        isChecked: false,
        _id: '8'
    },
    {
        username: 'ava',
        isChecked: false,
        _id: '9'
    },
    {
        username: 'daniel',
        isChecked: false,
        _id: '10'
    }
];