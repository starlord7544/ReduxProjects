import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, setIsAssignPage } from '../store/features/kanban/KanbanSlice'
import EditIcon from '../assets/Edit.svg'
import Del from '../assets/Delete.svg'
import CancelIcon from '../assets/Cancel.svg'
import EditTaskPage from './EditTaskPage'
import AssignIcon from '../assets/Assign.svg'
import UserList from './UserList'
import api from '../api'
import e from 'cors'

const TaskBox = ({ task, handleMoveTask }) => {
    const [isEditing, setIsEditing] = useState(false)
    const { title, tags, assignedTo, content, category, _id, priority } = task
    // console.log(title, tags, assignedTo, content, category, _id, priority)
    const dispatch = useDispatch()
    const { isAssignedView } = useSelector(state => state.kanban)
    const assignPage = useSelector(state => state.kanban.assignPage)

    const [touchStart, setTouchStart] = useState(null);
    const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });


    const handleTouchStart = (e) => {
        e.preventDefault();
        setTouchStart({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        });
    }


    const handleTouchMove = (e) => {
        if (!touchStart) return;

        const deltaX = e.touches[0].clientX - touchStart.x;
        const deltaY = e.touches[0].clientY - touchStart.y;

        setTouchOffset({ x: deltaX, y: deltaY });
        e.preventDefault();
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;

        // Get final touch position
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        // Find drop target container
        const targetElement = document.elementFromPoint(endX, endY);
        const container = targetElement?.closest('.inner-container');

        if (container && container.dataset.category !== category) {
            handleMoveTask(_id, category, container.dataset.category);
        }

        // Reset touch state
        setTouchStart(null);
        setTouchOffset({ x: 0, y: 0 });
        e.preventDefault();
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteTask({
                taskId: _id,
                category
            }))
            await api.deleteTask(_id)
        } catch (err) {
            console.error('Delete Failed : ', err)
        }
    }

    return (
        <>
            {
                isEditing && <EditTaskPage task={task} setIsEditing={setIsEditing} />
            }
            <div
                className="task-container"
                style={{
                    transform: `translate(${touchOffset.x}px, ${touchOffset.y}px)`,
                    transition: touchStart ? 'none' : 'transform 0.3s ease',
                    touchAction: 'none'
                }}
                draggable={true}
                onDragStart={(e) => {
                    const movingData = {
                        fromCategory: category,
                        taskId: _id
                    }
                    e.dataTransfer.setData('movingData', JSON.stringify(movingData))
                }}
                onTouchStart={(e) => handleTouchStart(e)}
                onTouchMove={(e) => handleTouchMove(e)}
                onTouchEnd={(e) => handleTouchEnd(e)}
                onTouchCancel={(e) => handleTouchEnd(e)}
            >
                <div className="title-container">
                    <div className={`task-priority ${priority && priority === 1 ? ('low') : (priority === 2 ? 'mid' : 'high')}`}></div>
                    <h3 className='task-title'>{title}</h3>
                </div>
                <p className='content'>{content}</p>
                <div className="tags">
                    {
                        tags?.map((tag, tagIdx) => (
                            <span className="tag" key={tagIdx + 'tag'}>
                                {tag}
                            </span>
                        ))
                    }
                </div>
                {/* <div className="task-btn-container"></div> */}
                <div className="task-btns">
                    <img
                        className={assignPage !== '' ? 'edit-btn disabled' : 'edit-btn'}
                        onClick={() => setIsEditing(true)}
                        src={EditIcon}
                        alt="edit"
                    />
                    {

                        !isAssignedView && (
                            <img
                                className={assignPage !== '' ? 'del-btn disabled' : 'del-btn'}
                                onClick={handleDelete}
                                src={Del}
                                alt='delete'
                            />
                        )
                    }
                </div>
                <div className="assigned">
                    {
                        assignedTo?.map((user, idx) => {
                            if (idx <= 3) {
                                return (
                                    <p
                                        className='user-profile'
                                        key={user._id}
                                        onClick={() => {
                                            if (idx < 3)
                                                return
                                            dispatch(setIsAssignPage(assignPage === '' ? _id : ''))
                                        }}
                                        title={idx < 3 ? user.username : 'show more'}
                                    >
                                        {idx < 3 ? user?.username?.trim()[0] : '...'}
                                    </p>
                                )
                            }
                            else
                                return null
                        })
                    }
                    {
                        assignPage === _id && (
                            <UserList
                                taskId={_id}
                                initialAssigned={assignedTo}
                                category={category}
                            />
                        )
                    }
                </div>
                <img
                    src={(assignPage === _id) ? CancelIcon : AssignIcon}
                    alt="assign"
                    className={(assignPage !== _id && assignPage !== '') ? (`assign-btn disabled`) : ('assign-btn')}
                    onClick={() => {
                        dispatch(setIsAssignPage(assignPage === '' ? _id : ''))
                    }}
                />
            </div >
        </>
    )
}

export default TaskBox