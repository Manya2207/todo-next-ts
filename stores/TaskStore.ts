import { types } from "mobx-state-tree";

const Task = types.model("Task", {
  id: types.identifier,
  title: types.string,
  description: types.string,
  status: types.string,
});

const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
    taskIdCounter: types.optional(types.number, 1),
  })
  .actions((self) => ({
    addTask(task: typeof Task.Type) {
      self.tasks.push(task);
      self.taskIdCounter += 1;
    },
    updateTaskStatus(taskId: string, newStatus: string) {
      const taskIndex = self.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        self.tasks[taskIndex].status = newStatus;
      }
    },
    deleteTask(taskId: string) {
      const taskIndex = self.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        self.tasks.splice(taskIndex, 1);
      }
    },
  }))
  .views((self) => ({
    generateTaskId() {
      return `task-${self.taskIdCounter}`;
    },
  }));

export default TaskStore;
