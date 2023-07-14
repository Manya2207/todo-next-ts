import "styles/tailwind.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskStore from "../stores/TaskStore";

const Home = () => {
  const taskStore = TaskStore.create({ tasks: [], taskIdCounter: 1 });

  return (
    <div className="min-h-screen main-container">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center main-heading">
          Task Manager
        </h1>
        <div className="flex flex-col items-center">
          <div className="w-full md:w-2/3">
            <TaskForm taskStore={taskStore} />
          </div>
          <div className="w-full md:w-3/3 mt-8">
            <TaskList taskStore={taskStore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
