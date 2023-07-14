import { useState } from "react";
import { observer } from "mobx-react-lite";
import TaskStore from "../stores/TaskStore";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskFormProps {
  taskStore: {
    addTask: (task: Task) => void;
    generateTaskId: () => string;
  };
}

const TaskForm = observer(({ taskStore }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    const newTask: Task = {
      id: taskStore.generateTaskId(),
      title,
      description,
      status: "To Do",
    };
    taskStore.addTask(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none mt-2"
      />
      <button
        type="submit"
        className="bg-pink-600 text-white py-2 px-4 rounded mt-2 hover:bg-pink-500 focus:outline-none add-btn"
      >
        Add Task
      </button>
    </form>
  );
});

export default TaskForm;
