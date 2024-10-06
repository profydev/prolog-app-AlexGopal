import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";
import { Alert } from "@features/ui";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loaderwrapper}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    // return <div>Error: {error.message}</div>;
    // return <div><Alert>Error: {error.message}</Alert></div>;
    return (
      <div>
        <Alert onActionClick={refetch}>
          There was a problem while loading the project data.
        </Alert>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
