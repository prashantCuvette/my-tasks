import useAuth from "../hooks/useAuth";
import styles from "./Dashboard.module.css";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <main className={styles.mainContent}>
        <div className={styles.welcome}>
          <h1>Welcome to your Dashboard, {user?.username}!</h1>
          <p>Select either Tasks or Notes to get started.</p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
