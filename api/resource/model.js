const db = require('../../data/dbConfig')

async function find(){
    return db("resources")
}
async function insert(res){
    const [id]= await db("resources").insert(res)
    const findId = await db("resources").where("resource_id",id).first();
    
    return findId
}


module.exports = {
    find, 
    insert
}