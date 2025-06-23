import React, { useState } from "react";
import { useTasks } from "../../contexts/TaskContext";
import styles from "./AddTask.module.css";

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, priority, completed: false });
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.addButton}>
        Add Task
      </button>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Add New Task</h2>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <textarea
                  placeholder="Task Description (Markdown supported)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.textarea}
                />
              </div>
              <div className={styles.inputGroup}>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={styles.select}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button type="submit" className={styles.addButton}>
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
