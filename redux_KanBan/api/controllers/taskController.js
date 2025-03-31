const Task = require('../model/taskSchema');

module.exports.createTask = async (req, res) => {
    try {
        const { title, content, category, createdBy, priority, tags, assignedTo } = req.body;
        if (!title || !content || !category || !createdBy) {
            console.log('Missing required fields')
            return res.status(400).send({
                status: 'fail',
                message: 'Missing required fields'
            })
        }

        const validCategories = ['todo', 'inProgress', 'completed'];
        if (!validCategories.includes(category)) {
            console.log('Invalid Category')
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid category'
            })
        }

        const newTask = await Task.create({
            title,
            content,
            category,
            createdBy,
            priority: priority || 1,
            tags: tags || [],
            assignedTo: assignedTo || []
        })

        console.log('task created')

        res.status(200)
        res.send({
            status: 'success',
            message: 'Task created successfully',
            task: newTask
        })
    } catch (err) {
        console.log(err.message)
        res.status(404)
        res.send({
            status: 'fail',
            message: 'Task creation failed',
            error: err.message,
        });
    }
}

module.exports.getUserTasks = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).send({
                status: 'fail',
                message: 'User ID is required'
            })
        }

        const tasks = await Task.find({ createdBy: userId })
            .populate('assignedTo', 'username')
            .lean();

        const categorized = {
            todo: tasks.filter(t => t.category === 'todo'),
            inProgress: tasks.filter(t => t.category === 'inProgress'),
            completed: tasks.filter(t => t.category === 'completed')
        };

        res.status(200)
        res.send({
            status: 'success',
            tasks: categorized
        });
    } catch (err) {
        res.send({
            status: 'fail',
            message: 'Failed to fetch tasks',
            error: err.message
        })
    }
}

module.exports.updateTask = async (req, res) => {
    try {


        const taskId = req.params.id;
        const updates = req.body;

        const allowedUpdates = ['title', 'content', 'tags', 'priority'];
        const isValidOperation = Object.keys(updates).every(update =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid updates! Only title, content, tags, and priority can be updated'
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedTask) {
            return res.status(404).send({
                status: 'fail',
                message: 'Task not found'
            });
        }

        res.status(200)
        res.send({
            status: 'success',
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid task ID format'
            });
        }
        res.status(500)
        res.send({
            status: 'fail',
            message: 'Task update failed',
            error: error.message
        });
    }
};


module.exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).send({
                status: 'fail',
                message: 'Task not found'
            });
        }

        res.status(200)
        res.send({
            status: 'success',
            message: 'Task deleted successfully',
            task: deletedTask
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid task ID format'
            });
        }
        res.status(500)
        res.send({
            status: 'fail',
            message: 'Task deletion failed',
            error: error.message
        });
    }
};

module.exports.moveTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { newCategory } = req.body;

        const validCategories = ['todo', 'inProgress', 'completed'];
        if (!validCategories.includes(newCategory)) {
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid category. Allowed values: todo, inProgress, completed'
            });
        }

        const movedTask = await Task.findByIdAndUpdate(
            taskId,
            { category: newCategory },
            { new: true }
        );

        if (!movedTask) {
            return res.status(404).send({
                status: 'fail',
                message: 'Task not found'
            });
        }

        res.status(200)
        res.send({
            status: 'success',
            message: 'Task moved successfully',
            task: movedTask
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid task ID format'
            });
        }
        res.status(500)
        res.send({
            status: 'fail',
            message: 'Task move failed',
            error: error.message
        });
    }
};

module.exports.assignUsers = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { userIds } = req.body;

        if (!Array.isArray(userIds)) {
            return res.status(400).send({
                status: 'fail',
                message: 'User IDs must be an array'
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: { assignedTo: userIds } },
            { new: true }
        ).populate('assignedTo', 'username')

        if (!updatedTask) {
            return res.status(404).send({
                status: 'fail',
                message: 'Task not found'
            });
        }

        res.status(200)
        res.send({
            status: 'success',
            message: 'Users assigned successfully',
            task: updatedTask
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid ID format'
            });
        }
        res.status(500)
        res.send({
            status: 'fail',
            message: 'Assignment failed',
            error: error.message
        });
    }
};