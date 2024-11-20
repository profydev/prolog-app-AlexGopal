import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";

type IssueListProps = {
  searchTerm?: string;
};

export function IssueList({ searchTerm }: IssueListProps) {
  const router = useRouter();
  const [localPage, setLocalPage] = useState(1);
  const page = Number(router.query.page || 1);
  const isFiltered = Boolean(searchTerm);

  // Fetch issues, applying client-side filtering if `searchTerm` is present
  const { data, isLoading, isError } = useGetIssues(
    isFiltered ? 1 : page,
    searchTerm,
  );
  const projects = useGetProjects();

  useEffect(() => {
    if (!isFiltered) {
      setLocalPage(1); // Reset local pagination when not filtering
    }
  }, [isFiltered]);

  if (projects.isLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (projects.isError) {
    console.error("Error loading projects:", projects.error);
    return <div>Error loading projects.</div>;
  }

  if (isError) {
    console.error("Error loading issues");
    return <div>Error loading issues.</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );

  const { items = [], meta } = data || {};
  const itemsPerPage = 10; // Desired items per page

  // Apply pagination for filtered items
  const paginatedItems = isFiltered
    ? items.slice((localPage - 1) * itemsPerPage, localPage * itemsPerPage)
    : items;

  const totalFilteredPages = isFiltered
    ? Math.ceil(items.length / itemsPerPage)
    : meta?.totalPages || 1;

  const currentPage = isFiltered ? localPage : page;
  const totalPages = isFiltered ? totalFilteredPages : meta?.totalPages || 1;

  console.log("Current view:", isFiltered ? "Filtered" : "Default");
  console.log("Current page:", currentPage);
  console.log("Total pages:", totalPages);
  console.log("Items on current page:", paginatedItems.length);
  console.log("All items fetched:", items.length);

  const navigateToPage = (newPage: number) => {
    if (isFiltered) {
      setLocalPage(newPage);
    } else {
      router.push({
        pathname: router.pathname,
        query: { page: newPage },
      });
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Issue</th>
            <th className={styles.headerCell}>Level</th>
            <th className={styles.headerCell}>Events</th>
            <th className={styles.headerCell}>Users</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.length === 0 ? (
            <tr>
              <td colSpan={4}>No issues found.</td>
            </tr>
          ) : (
            paginatedItems.map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))
          )}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.pageInfo}>
          Page <span className={styles.pageNumber}>{currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{totalPages}</span>
        </div>
      </div>
    </div>
  );
}

export default IssueList;
