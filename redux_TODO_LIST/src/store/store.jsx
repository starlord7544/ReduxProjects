import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './TodoSlice.jsx'

export default configureStore({
    reducer: {
        todos: todoReducer,
    }
})