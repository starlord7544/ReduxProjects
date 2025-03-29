import { configureStore } from "@reduxjs/toolkit"
import kanbanReducer from './features/kanban/KanbanSlice.jsx'
// import { loadState, saveState } from "./localStorageHelpers.jsx"

// const preloadedState = loadState()

const store = configureStore({
    reducer: {
        kanban: kanbanReducer,
    },
    // preloadedState,
})

// store.subscribe(() => {
//     saveState(store.getState())
// })

export default store