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
    assignedTasks: {
        todo: [],
        inProgress: [],
        completed: [],
    },
    error: null,
    isAssignedView: false,
    assignPage: '',
    sortBy: 'priority'
}

const KanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setSortby: (state, action) => {
            state.sortBy = action.payload
        },
        setIsAssignedView: (state, action) => {
            state.isAssignedView = action.payload
        },
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        addTask: (state, action) => {
            state.tasks[action.payload.category].push(action.payload)
            state.tasks[action.payload.category].sort((a, b) => b.priority - a.priority)
            // if (state.sortBy === 'priority')
            //     state.tasks[action.payload.category].sort((a, b) => b.priority - a.priority)
            // if (state.sortBy === 'date')
            //     state.tasks[action.payload.category].sort((a, b) => b.createdAt - a.createdAt)
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

            const taskIdx = state.tasks[fromCategory].findIndex(ele => ele._id === taskId)
            if (taskIdx !== -1) {
                const [task] = state.tasks[fromCategory].splice(taskIdx, 1)
                state.tasks[toCategory].push({ ...task, category: toCategory })
                state.tasks[toCategory].sort((a, b) => b.priority - a.priority)
            }

            const assignedTaskIdx = state.assignedTasks[fromCategory].findIndex(ele => ele._id === taskId)
            if (assignedTaskIdx !== -1) {
                const [assignedTask] = state.assignedTasks[fromCategory].splice(assignedTaskIdx, 1)
                state.assignedTasks[toCategory].push({ ...assignedTask, category: toCategory })
                state.assignedTasks[toCategory].sort((a, b) => b.priority - a.priority)
            }

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
            const taskIdx = state.tasks[category].findIndex(ele => ele._id === action.payload.taskId)
            if (taskIdx !== -1) {
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
            }
            const assignedTaskIdx = state.assignedTasks[category].findIndex(ele => ele._id === action.payload.taskId)
            if (assignedTaskIdx !== -1) {
                state.assignedTasks[category] = state.assignedTasks[category].map(ele => {
                    if (ele._id === action.payload.taskId) {
                        return {
                            ...ele,
                            ...action.payload.EditedTask,
                            tags,
                        }
                    }
                    return ele
                })
                state.assignedTasks[category].sort((a, b) => b.priority - a.priority)
            }
        },
        updateAssignedUsers: (state, action) => {
            const { taskId, category, assignedTo } = action.payload
            const taskIdx = state.tasks[category].findIndex(ele => ele._id === taskId)
            if (taskIdx !== -1) {
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
            const assignedTaskIdx = state.assignedTasks[category].findIndex(ele => ele._id === action.payload.taskId)
            if (assignedTaskIdx !== -1) {
                state.assignedTasks[category] = state.assignedTasks[category].map(task => (
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
        },
        setAssignedTasks: (state, action) => {
            state.assignedTasks = action.payload
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
    setAssignedTasks,
    setIsAssignedView,
    setSortby
} = KanbanSlice.actions;

export default KanbanSlice.reducer