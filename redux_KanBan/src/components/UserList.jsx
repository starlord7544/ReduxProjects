import React, { useEffect, useState } from 'react'

const UserList = ({ List, filter }) => {
    const [userArr, setUserArr] = useState(assigned)
    const [searchInput, setSearchInput] = useState('')
    const handleChange = (userID) => {
        const newUserArr = userArr.map(ele => {
            if (ele._id === userID)
                ele.isChecked = !ele.isChecked
            return ele
        })
        setUserArr(newUserArr)
    }
    useEffect(() => {
        if (!filter)
            return
        const newUserArr = userArr.filter(ele => ele.isChecked === true)
        setUserArr(newUserArr)
    }, [filter, searchInput])
    return (
        <div className='user-list'>
            <input type="text"
                autoFocus
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <p></p>
            {
                userArr.map((ele) => {
                    if (JSON.stringify(ele.username).toLowerCase().includes(searchInput.toLowerCase()))
                        return <div key={ele._id} className='user-name'>
                            <input
                                type="checkbox" id={ele._id}
                                checked={ele.isChecked}
                                onChange={() => handleChange(ele._id)}
                            />
                            <label htmlFor={ele._id}>
                                {ele.username}
                            </label>
                        </div>
                })
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