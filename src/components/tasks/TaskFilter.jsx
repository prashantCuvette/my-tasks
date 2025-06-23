import React from "react";
import styles from "./TaskFilter.module.css";

const TaskFilter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={filter.status}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={filter.priority}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          name="sortBy"
          value={filter.sortBy}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="createdAt_desc">Newest First</option>
          <option value="createdAt_asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
