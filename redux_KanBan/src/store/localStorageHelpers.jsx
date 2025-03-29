// export const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('kanbanState')
//         return serializedState ? JSON.parse(serializedState) : undefined
//     } catch (err) {
//         console.error("Could not load state", err)
//         return undefined
//     }
// }

// export const saveState = (state) => {
//     try {
//         const serializedState = JSON.stringify(state)
//         localStorage.setItem('kanbanState', serializedState)
//     } catch (err) {
//         console.error("Could not save state", err)
//     }
// }