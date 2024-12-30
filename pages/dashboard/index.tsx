import type { NextPage } from "next";
import { PageContainer } from "@features/layout";
import { ProjectList } from "@features/projects";
import styles from "./index.module.scss";

const Home: NextPage = () => {
  return (
    <PageContainer
      title="Projects"
      info={
        <div className={styles.infoContainer}>
          Overview of your projects sorted by alert{" "}
          <span className={styles.breakText}>level</span>
        </div>
      }
    >
      <ProjectList />
    </PageContainer>
  );
};

export default Home;
