import React, { createContext, useState, useEffect, useContext } from "react";
import useAuth from "../hooks/useAuth";
import * as taskService from "../services/taskService";
import useOfflineSync from "../hooks/useOfflineSync";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useOfflineSync(
    user ? `tasks_${user.id}` : "tasks_offline",
    []
  );
  const [loading, setLoading] = useState(true);

  const syncTasks = async () => {
    if (!user || !navigator.onLine) return;

    // "Last write wins" - local data is sent to server
    try {
      const serverTasks = await taskService.getTasks(user.id);

      // Simple sync: find local tasks not on server and add them.
      // A more robust solution would handle updates and deletions.
      const localOnlyTasks = tasks.filter(
        (localTask) =>
          !serverTasks.some((serverTask) => serverTask.id === localTask.id)
      );

      await Promise.all(
        localOnlyTasks.map((task) => taskService.addTask(task))
      );

      // After syncing, refetch from server to get the canonical state
      const updatedServerTasks = await taskService.getTasks(user.id);
      setTasks(updatedServerTasks);
    } catch (error) {
      console.error("Failed to sync tasks", error);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      syncTasks().finally(() => setLoading(false));
    }

    window.addEventListener("online", syncTasks);
    return () => window.removeEventListener("online", syncTasks);
  }, [user]);

  const addTask = async (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    if (navigator.onLine) {
      try {
        await taskService.addTask(newTask);
      } catch (error) {
        console.error("Failed to add task to server", error);
      }
    }
  };

  const updateTask = async (taskId, taskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...taskData } : task
    );
    setTasks(updatedTasks);
    if (navigator.onLine) {
      try {
        await taskService.updateTask(taskId, taskData);
      } catch (error) {
        console.error("Failed to update task on server", error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    if (navigator.onLine) {
      try {
        await taskService.deleteTask(taskId);
      } catch (error) {
        console.error("Failed to delete task from server", error);
      }
    }
  };

  const value = {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
