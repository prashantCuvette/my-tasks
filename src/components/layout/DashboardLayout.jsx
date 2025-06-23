import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import { TaskProvider } from "../../contexts/TaskContext";
import { NoteProvider } from "../../contexts/NoteContext";

const DashboardLayout = () => {
  return (
    <TaskProvider>
      <NoteProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </NoteProvider>
    </TaskProvider>
  );
};

export default DashboardLayout;
