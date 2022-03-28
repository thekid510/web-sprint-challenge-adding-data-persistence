const db = require('../../data/dbConfig')

async function findAll () {
    const rows = await db('tasks as t')
        .join('projects as p', 'p.project_id', 't.project_id')
        .select('t.*', 'p.project_name', 'p.project_description')
    return rows.map(t=> {
        return {
            ...t,
            task_completed: t.task_completed ? true : false
    }});
}

async function findById (id) {
    const t = await db('tasks as t')
        .join('projects as p', 'p.project_id', 't.project_id')
        .select('t.*', 'p.project_name', 'p.project_description')
        .where('task_id', id)
        .first()
    return {
        ...t, 
        task_completed: t.task_completed ? true : false
    }
}

async function insert (task) {
    const [id] = await db('tasks')
        .insert(task)
    return findById(id)
}

module.exports = { 
    findAll, 
    insert 
}