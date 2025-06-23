import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import TaskList from "../components/tasks/TaskList";
import AddTask from "../components/tasks/AddTask";
import TaskFilter from "../components/tasks/TaskFilter";
import styles from "./Tasks.module.css";

const TasksPage = () => {
  const { tasks, loading } = useTasks();
  const [filter, setFilter] = useState({
    status: "all",
    priority: "all",
    sortBy: "createdAt_desc",
  });

  const filteredTasks = tasks
    .filter((task) => {
      if (filter.status === "all") return true;
      return filter.status === "completed" ? task.completed : !task.completed;
    })
    .filter((task) => {
      if (filter.priority === "all") return true;
      return task.priority === filter.priority;
    })
    .sort((a, b) => {
      if (filter.sortBy === "createdAt_desc") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  return (
    <div className={styles.tasksPage}>
      <h1 className={styles.title}>Tasks</h1>
      <div className={styles.controls}>
        <TaskFilter filter={filter} setFilter={setFilter} />
        <AddTask />
      </div>
      {loading ? <p>Loading tasks...</p> : <TaskList tasks={filteredTasks} />}
    </div>
  );
};

export default TasksPage;
