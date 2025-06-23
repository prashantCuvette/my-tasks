import React from "react";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one to get started!</p>;
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
