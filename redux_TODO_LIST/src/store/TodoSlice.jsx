import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'

const initalState = {
    taskArr: []
}

const TodoSlice = createSlice({
    name: 'todo',
    initialState: initalState,
    reducers: {
        createTask: {
            reducer: (state, action) => {
                // console.log(action.payload)
                state.taskArr.push({
                    content: action.payload,
                    isChecked: false,
                    id: uuidv4()
                })
            }
            // prepare: (content) => ({
            //     payload: {
            //         content: content,
            //         isChecked: false,
            //         id: uuidv4(),
            //     }
            // })
        },
        deleteTask: (state, action) => {
            console.log(action.payload)
            state.taskArr = state.taskArr.filter(task => task.id !== action.payload)
        },
        toggleTask: (state, action) => {
            state.taskArr = state.taskArr.map(task => {
                if (task.id === action.payload) {
                    task.isChecked = !task.isChecked
                }
                return task
            })
        },
        editTask: (state, action) => {
            console.log(action.payload);

            state.taskArr = state.taskArr.map(task => {
                if (task.id === action.payload.id)
                    task.content = action.payload.content

                return task
            })
        }
    }
})

export const { createTask, deleteTask, toggleTask, editTask } = TodoSlice.actions
export default TodoSlice.reducer