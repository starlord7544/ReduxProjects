import { createSlice, TaskAbortError } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'

// const tempData1 = {
//     title: 'temp1',
//     content: 'content sv',
//     category: 'todo',
//     tags: ['tag1', 'tag2'],
//     priority: '0',
//     assignedTo : [],
// }

export const initialState = {
    currentUser: null,
    tasks: {
        todo: [],
        inProgress: [],
        completed: [],
    },
    error: null,
    assignPage: ''
}

const KanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        addTask: (state, action) => {
            state.tasks[action.payload.category].push(action.payload)
            state.tasks[action.payload.category].sort((a, b) => b.priority - a.priority)
        },
        deleteTask: (state, action) => {
            const { taskId, category } = action.payload
            console.log(action.payload)
            state.tasks[category] = state.tasks[category].filter(ele => (
                taskId !== ele._id
            ))
        },
        moveTask: (state, action) => {
            const { fromCategory, toCategory, taskId } = action.payload
            const task = state.tasks[fromCategory].find(ele => ele._id === taskId)
            state.tasks[fromCategory] = state.tasks[fromCategory].filter(ele => ele._id !== taskId)
            state.tasks[toCategory].push({ ...task, category: toCategory })
            state.tasks[toCategory].sort((a, b) => b.priority - a.priority)
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setIsAssignPage: (state, action) => {
            state.assignPage = action.payload
        },
        editTask: (state, action) => {
            const category = action.payload.category
            const tags = action.payload.EditedTask.tags.filter(ele => ele.trim().length > 0)
            state.tasks[category] = state.tasks[category].map(ele => {
                if (ele._id === action.payload.taskId) {
                    return {
                        ...ele,
                        ...action.payload.EditedTask,
                        tags,
                    }
                }
                return ele
            })
            state.tasks[category].sort((a, b) => b.priority - a.priority)
        },
        updateAssignedUsers: (state, action) => {
            const { taskId, category, assignedTo } = action.payload
            // console.log(taskId, userIds, category)
            state.tasks[category] = state.tasks[category].map(task => (
                task._id === taskId ? {
                    ...task,
                    assignedTo: assignedTo.map(u => (
                        {
                            _id: u._id,
                            username: u.username
                        }
                    ))
                } : task
            ))
        }







        // updateTask: (state, action) => {
        //     const { taskId, updates } = action.payload
        //     const categories = Object.keys(state.tasks)
        //     categories.forEach(ele => {
        //         state.tasks[ele] = state.tasks[ele].map(task => (
        //             taskId === task.id ? { ...task, ...updates } : task
        //         ))
        //     })
        // },
        // addTask: (state, action) => {
        //     const tags = action.payload.tags.filter(ele => ele.trim().length > 0)
        //     state[action.payload.category].push(
        //         {
        //             ...action.payload,
        //             // tags: [...tags],
        //             tags,
        //             // assigned,
        //             id: uuidv4(),
        //         }
        //     )
        //     state[action.payload.category].sort((a, b) => b.priority - a.priority)
        // },
        // moveTask: (state, action) => {
        //     const { fromCategory, toCategory, taskId } = action.payload
        //     const task = state[fromCategory].find(ele => ele.id === taskId)
        //     task.category = toCategory
        //     state[fromCategory] = state[fromCategory].filter(ele => ele.id !== taskId)
        //     state[toCategory].push(task)
        //     state[toCategory].sort((a, b) => b.priority - a.priority)
        // },
        // deleteTask: (state, action) => {
        //     const { category, taskId } = action.payload
        //     state[category] = state[category].filter(ele => ele.id !== taskId)
        // },
    }
})

// export const { addTask, moveTask, deleteTask, editTask, setIsAssignPage } = KanbanSlice.actions
export const {
    setUser,
    setTasks,
    addTask,
    // updateTask,
    deleteTask,
    moveTask,
    setError,
    editTask,
    setIsAssignPage,
    updateAssignedUsers,
} = KanbanSlice.actions;

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