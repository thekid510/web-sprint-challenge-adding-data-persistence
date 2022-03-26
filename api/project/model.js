const db = require('../../data/dbConfig')

async function find(id){
    const verify = id;
    if(verify){
        const proj = await db("projects").where("project_id", id).first();
    return {
            project_id: proj.project_id,
            project_name: proj.project_name,
            project_description: proj.project_description,
            project_completed: !!proj.project_completed
        };
    } else{
        const projects = await db("projects");
        return projects.map(proj => {
            return{
                project_id: proj.project_id,
                project_name: proj.project_name,
                project_description: proj.project_description,
                project_completed: !!proj.project_completed
            };
        });
    }
}
async function insert(proj){
    const [id] = await db("projects").insert(proj);
        return find(id)
}
module.exports = {
    find,
    insert
}