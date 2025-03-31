import { configureStore } from "@reduxjs/toolkit"
import kanbanReducer, { initialState } from './features/kanban/KanbanSlice.jsx'
import { loadState, saveState } from "./localStorageHelpers.jsx"

const preloadedState = loadState()

const store = configureStore({
    reducer: {
        kanban: kanbanReducer,
    },
    preloadedState: {
        kanban: {
            ...initialState,
            ...preloadedState
        }
    }
})

store.subscribe(() => {
    saveState(store.getState().kanban)
})

export default store