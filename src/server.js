import { createServer, Model, Factory, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      todo: Model,
    },

    factories: {
      todo: Factory.extend({
        text(i) {
          return `Task ${i + 1}`;
        },
        isCompleted: false,
      }),
    },

    seeds(server) {
      server.createList("todo", 3);
    },

    routes() {
      this.namespace = "api";

      this.get("/todos", (schema) => {
        return schema.todos.all();
      });

      this.post("/todos", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.todos.create(attrs);
      });

      this.get("/todos/:id", (schema, request) => {
        let id = request.params.id;
        let todo = schema.todos.find(id);

        return todo ? todo : new Response(404);
      });

      this.put("/todos/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let todo = schema.todos.find(id);

        return todo.update(newAttrs);
      });

      this.delete("/todos/:id", (schema, request) => {
        let id = request.params.id;
        let todo = schema.todos.find(id);

        todo.destroy();
        return new Response(204);
      });
    },
  });
}
