import React from "react";
import ReactMarkdown from "react-markdown";
import { useTasks } from "../../contexts/TaskContext";
import styles from "./TaskItem.module.css";

const priorityColors = {
  low: "#28a745",
  medium: "#ffc107",
  high: "#dc3545",
};

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const handleStatusChange = (e) => {
    updateTask(task.id, { completed: e.target.checked });
  };

  return (
    <div
      className={styles.taskItem}
      style={{ borderLeftColor: priorityColors[task.priority] }}
    >
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleStatusChange}
        />
      </div>
      <div className={styles.taskDescription}>
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </div>
      <div className={styles.taskFooter}>
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        <div className={styles.taskActions}>
          {/* Edit button will be implemented later */}
          <button onClick={() => deleteTask(task.id)}>🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
