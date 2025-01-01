import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";

type IssueListProps = {
  searchTerm?: string;
  status?: string; // New status prop
  level?: string; // For desktop
  projectId?: string;
};

export function IssueList({
  searchTerm,
  status,
  level,
  projectId,
}: IssueListProps) {
  const router = useRouter();
  const [localPage, setLocalPage] = useState(1);
  const page = Number(router.query.page || 1);
  const isFiltered = Boolean(searchTerm || status || level || projectId);

  // Fetch issues, applying filters
  const { data, isLoading, isError } = useGetIssues(
    isFiltered ? 1 : page,
    searchTerm,
    status, // Pass the status to the hook
    level,
    projectId,
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
    return <div>Error loading projects.</div>;
  }

  if (isError) {
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
  const itemsPerPage = 10;

  const paginatedItems = isFiltered
    ? items.slice((localPage - 1) * itemsPerPage, localPage * itemsPerPage)
    : items;

  const totalFilteredPages = isFiltered
    ? Math.ceil(items.length / itemsPerPage)
    : meta?.totalPages || 1;

  const currentPage = isFiltered ? localPage : page;
  const totalPages = isFiltered ? totalFilteredPages : meta?.totalPages || 1;

  const navigateToPage = (newPage: number) => {
    if (isFiltered) {
      setLocalPage(newPage); // Update client-side page
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
            <th className={styles.headerCell}>
              {/* Change from "Level" to "Status" for mobile */}
              <span className={styles.mobileOnly}>Status</span>
              <span className={styles.desktopOnly}>Level</span>
            </th>
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
