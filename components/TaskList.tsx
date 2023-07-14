import { observer } from "mobx-react-lite";
import TaskStore from "../stores/TaskStore";
import { types } from "mobx-state-tree";

const Task = types.model("Task", {
  id: types.identifier,
  title: types.string,
  description: types.string,
  status: types.string,
});

interface TaskListProps {
  taskStore: typeof TaskStore.Type;
}

const TaskList = observer(({ taskStore }: TaskListProps) => {
  const statuses = ["To Do", "In Progress", "Completed"];
  const colors = ["bg-yellow-300", "bg-blue-300", "bg-green-300"];

  const handleChangeStatus = (taskId: string, newStatus: string) => {
    taskStore.updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="flex flex-wrap">
      {statuses.map((status, index) => (
        <div key={status} className="w-full md:w-1/3 p-4">
          <h2
            className={`text-lg font-semibold mb-2 ${colors[index]} text-center`}
          >
            {status}
          </h2>
          {taskStore.tasks.map((task: typeof Task.Type) => {
            if (task.status === status) {
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-md p-4 shadow-sm mb-4"
                >
                  <h3
                    title={task.title}
                    className="text-md font-bold mb-2 task-text"
                  >
                    {task.title}
                  </h3>
                  <p
                    title={task.description}
                    className="text-gray-600 mb-2 task-text"
                  >
                    {task.description}
                  </p>
                  <div className="flex justify-between">
                    <button
                      className="text-red-500 font-medium hover:text-red-600 focus:outline-none"
                      onClick={() => taskStore.deleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleChangeStatus(task.id, e.target.value)
                      }
                      className="p-2 border border-gray-300 rounded focus:outline-none"
                    >
                      {statuses.map((statusOption, optionIndex) => (
                        <option
                          key={statusOption}
                          value={statusOption}
                          className={optionIndex === index ? colors[index] : ""}
                        >
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
});

export default TaskList;
