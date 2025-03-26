import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { v4 as uuidv4 } from 'uuid'

const tempData1 = {
    title: 'temp1',
    content: 'content sv',
    category: 'todo',
    tags: ['tag1', 'tag2'],
    priority : '0',
    // collaborators: [],
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
        },
        moveTask: (state, action) => {
            const { fromCategory, toCategory, taskId } = action.payload
            // console.log(action.payload)
            const task = state[fromCategory].find(ele => ele.id === taskId)
            task.category = toCategory
            // console.log(task)
            state[fromCategory] = state[fromCategory].filter(ele => ele.id !== taskId)
            state[toCategory].push(task)
        },
        deleteTask: (state, action) => {
            const {category, taskId} = action.payload
            state[category] = state[category].filter(ele => ele.id !== taskId)
        }
    }
})

export const { addTask, moveTask, deleteTask } = KanbanSlice.actions
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