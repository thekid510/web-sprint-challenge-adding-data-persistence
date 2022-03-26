const db = require('../../data/dbConfig')

async function find(){
    const t = await db("tasks as t")
    .leftJoin("projects", "projects.project_id", "t.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "projects.project_name",
      "projects.project_description"
    )
const result = t.map(t => {
    return{
        task_id: t.task_id,
        task_description: t.task_description,
        task_notes: t.task_notes,
        task_completed: !!t.task_completed,
        project_name: t.project_name,
        project_description: t.project_description,
    }
});
    return result;
}
function getById(task_id){
    return db("tasks").where("task_id", task_id)
}

async function insert(t){
    const [id] = await db("tasks").insert(t);
    const [newTasks] = await getById(id);
    return{
        ...newTasks,
        task_completed: !!t.task_completed,
        
    };
}
module.exports={
    find,
    insert,
    getById
}