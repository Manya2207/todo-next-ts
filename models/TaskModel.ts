import { types } from "mobx-state-tree";

export const Task = types
  .model("Task", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.enumeration(["To Do", "In Progress", "Completed"]),
  })
  .actions((self) => ({
    updateTitle(newTitle: string) {
      self.title = newTitle;
    },
    updateDescription(newDescription: string) {
      self.description = newDescription;
    },
    updateStatus(newStatus: "To Do" | "In Progress" | "Completed") {
      self.status = newStatus;
    },
  }));

export const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    addTask(title: string, description: string) {
      const id = Math.random().toString(36).substr(2, 9);
      const task = Task.create({ id, title, description, status: "To Do" });
      self.tasks.push(task);
    },
    updateTask(id: string, title: string, description: string) {
      const task = self.tasks.find((t) => t.id === id);
      if (task) {
        task.updateTitle(title);
        task.updateDescription(description);
      }
    },
    deleteTask(id: string) {
      const index = self.tasks.findIndex((t) => t.id === id);
      if (index !== -1) {
        self.tasks.splice(index, 1);
      }
    },
  }));

export const RootStore = types.model("RootStore", {
  taskStore: TaskStore,
});

export const createRootStore = () => {
  const rootStore = RootStore.create({
    taskStore: TaskStore.create({ tasks: [] }),
  });
  return rootStore;
};
