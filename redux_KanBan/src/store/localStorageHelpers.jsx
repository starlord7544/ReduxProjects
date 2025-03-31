export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('kanbanState')
        return serializedState ? JSON.parse(serializedState) : null
    } catch (err) {
        console.error("Could not load state", err)
        return null
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify({ currentUser: state.currentUser })
        localStorage.setItem('kanbanState', serializedState)
    } catch (err) {
        console.error("Could not save state", err)
    }
}