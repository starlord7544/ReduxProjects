import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { v4 as uuidv4 } from 'uuid'

const tempData1 = {
    title: 'temp1',
    content: 'content sv',
    category: 'todo',
    tags: ['tag1', 'tag2'],
    priority: '0',
}

const initialState = {
    todo: [],
    inProgress: [],
    completed: [],
}

const KanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state[action.payload.category].push(
                {
                    ...action.payload,
                    id: uuidv4(),
                }
            )
            state[action.payload.category].sort((a, b) => b.priority - a.priority)
        },
        moveTask: (state, action) => {
            const { fromCategory, toCategory, taskId } = action.payload
            const task = state[fromCategory].find(ele => ele.id === taskId)
            task.category = toCategory
            state[fromCategory] = state[fromCategory].filter(ele => ele.id !== taskId)
            state[toCategory].push(task)
            state[toCategory].sort((a, b) => b.priority - a.priority)
        },
        editTask: (state, action) => {
            console.log(action.payload)
            const category = action.payload.EditedTask.category
            state[category] = state[category].map(ele => {
                if (ele.id === action.payload.taskId) {
                    return {
                        ...ele,
                        ...action.payload.EditedTask
                    }
                }
                return ele
            })
            state[category].sort((a, b) => b.priority - a.priority)
        },
        deleteTask: (state, action) => {
            const { category, taskId } = action.payload
            state[category] = state[category].filter(ele => ele.id !== taskId)
        }
    }
})

export const { addTask, moveTask, deleteTask, editTask } = KanbanSlice.actions
export default KanbanSlice.reducer



// const tempData2 = {
//     title: 'temp2',
//     content: 'contentefgbjvaeuibgvfoeae1',
//     category: 'inProgress',
//     tags: ['tag1', 'tag2'],
//     collaborators: [],
// }
// const tempData3 = {
//     title: 'temp3',
//     content: 'contentefgbjvaeuibgvfoeae1',
//     category: 'completed',
//     tags: ['tag1', 'tag2'],
//     collaborators: [],
// }