import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    task: null,
    position: { x: 0, y: 0 },
}

const ghostSlice = createSlice({
    name: 'ghost',
    initialState,
    reducers: {
        setGhostTask: (state, action) => {
            state.task = action.payload.task
            state.position = action.payload.position
        },
        updateGhostPosition: (state, action) => {
            state.position = action.payload
        },
        clearGhostTask: (state) => {
            state.task = null
        },
    }
})

export const { setGhostTask, updateGhostPosition, clearGhostTask } = ghostSlice.actions
export default ghostSlice.reducer
