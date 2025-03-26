import React from 'react'

const TaskBox = ({ task }) => {
    const { title, tags, content, category, id } = task
    return (
        <div
            className="task-container"
            draggable={true}
            onDragStart={(e) => {
                const movingData = {
                    fromCategory: category,
                    taskId : id
                }
                e.dataTransfer.setData('movingData', JSON.stringify(movingData))
            }}
        >
            <h3>{title}</h3>
            {
                tags?.map((tag, tagIdx) => (
                    <div className="tag" key={tagIdx + 'tag'}>
                        {tag}
                    </div>
                ))
            }
            <p>{content}</p>
            <button>Delete</button>
        </div>
    )
}

export default TaskBox