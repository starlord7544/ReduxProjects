import { configureStore } from "@reduxjs/toolkit"
import kanbanReducer, { initialState } from './features/kanban/KanbanSlice.jsx'
import ghostReducer from './features/kanban/ghostSlice.jsx'
import { loadState, saveState } from "./localStorageHelpers.jsx"

const preloadedState = loadState()

const store = configureStore({
    reducer: {
        kanban: kanbanReducer,
        ghost: ghostReducer
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