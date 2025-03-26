import React, { useState } from 'react'
import { createTask } from '../store/TodoSlice'
import { useDispatch } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
    return (
        <>
            <h1>TODO_LIST REDUX</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (inputValue.trim() === '')
                    return
                dispatch(createTask(inputValue))
                setInputValue('')
            }}>
                <input
                    type="text"
                    placeholder='Enter Task'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className='submit-btn' type='submit'>Submit</button>
            </form>
        </>

    )
}

export default Header