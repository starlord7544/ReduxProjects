import React from 'react'
import { useSelector } from 'react-redux'

const GhostTask = () => {
    const { task, position } = useSelector(state => state.ghost)

    if (!task) return null

    const style = {
        position: 'fixed',
        left: position.x + 10,
        top: position.y + 10,
        pointerEvents: 'none',
        opacity: 0.8,
        zIndex: 9999,
        width: '200px',
    }

    return (
        <div style={style} className="ghost-task">
            <div className="title-container">
                <h3 className='task-title'>{task.title}</h3>
            </div>
            <p className='content'>{task.content}</p>
        </div>
    )
}

export default GhostTask