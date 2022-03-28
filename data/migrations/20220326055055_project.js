exports.up = async function(knex) {
    await knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments("project_id");
      tbl.string("project_name").notNullable();
      tbl.string("project_description",128);
      tbl.boolean("project_completed").defaultTo(0);
    })
    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");
      tbl.string("resource_name",128).notNullable().unique();
      tbl.string("resource_description",400);
    })
    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");
      tbl.string("task_description",255).notNullable();
      tbl.string("task_notes",255);
      tbl.boolean("task_completed").defaultTo(false);
      tbl.integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable('project_resources', (tbl) => {
        tbl.increments('project_resource_id')
    })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
