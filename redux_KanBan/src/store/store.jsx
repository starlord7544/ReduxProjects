import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from './features/kanban/KanbanSlice.jsx'

export default configureStore({
    reducer: {
        kanban: kanbanReducer
    }
})