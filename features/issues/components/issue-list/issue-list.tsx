import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";

// type IssueListProps = {
//   searchTerm?: string;
// };

// export function IssueList({ searchTerm }: IssueListProps) {
//   const router = useRouter();
//   const page = Number(router.query.page || 1);
//   const navigateToPage = (newPage: number) =>
//     router.push({
//       pathname: router.pathname,
//       query: { page: newPage },
//     });

//   // Pass searchTerm to useGetIssues
//   const issuesPage = useGetIssues(page, searchTerm);
//   const projects = useGetProjects();

//   // Log the issues data returned from useGetIssues
//   console.log("API response in IssueList:", issuesPage.data);

//   if (projects.isLoading || issuesPage.isLoading) {
//     return <div>Loading</div>;
//   }

//   if (projects.isError) {
//     console.error(projects.error);
//     return <div>Error loading projects: {projects.error.message}</div>;
//   }

//   if (issuesPage.isError) {
//     console.error(issuesPage.error);
//     return <div>Error loading issues: {issuesPage.error.message}</div>;
//   }

//   const projectIdToLanguage = (projects.data || []).reduce(
//     (prev, project) => ({
//       ...prev,
//       [project.id]: project.language,
//     }),
//     {} as Record<string, ProjectLanguage>
//   );

//   const { items, meta } = issuesPage.data || {};
//   console.log("Filtered items in IssueList:", items); // Log filtered items to confirm the data

//   return (
//     <div className={styles.container}>
//       <table className={styles.table}>
//         <thead>
//           <tr className={styles.headerRow}>
//             <th className={styles.headerCell}>Issue</th>
//             <th className={styles.headerCell}>Level</th>
//             <th className={styles.headerCell}>Events</th>
//             <th className={styles.headerCell}>Users</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(items || []).map((issue) => (
//             <IssueRow
//               key={issue.id}
//               issue={issue}
//               projectLanguage={projectIdToLanguage[issue.projectId]}
//             />
//           ))}
//         </tbody>
//       </table>
//       <div className={styles.paginationContainer}>
//         <div>
//           <button
//             className={styles.paginationButton}
//             onClick={() => navigateToPage(page - 1)}
//             disabled={page === 1}
//           >
//             Previous
//           </button>
//           <button
//             className={styles.paginationButton}
//             onClick={() => navigateToPage(page + 1)}
//             disabled={page === meta?.totalPages}
//           >
//             Next
//           </button>
//         </div>
//         <div className={styles.pageInfo}>
//           Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
//           <span className={styles.pageNumber}>{meta?.totalPages}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default IssueList;

type IssueListProps = {
  searchTerm?: string;
};

export function IssueList({ searchTerm }: IssueListProps) {
  const router = useRouter();
  const page = Number(router.query.page || 1);

  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });

  // Fetch issues without applying `searchTerm` filter
  const issuesPage = useGetIssues(page);
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );

  const { items = [], meta } = issuesPage.data || {};

  // Filter issues locally by combined `name` + `message`
  const filteredItems = items.filter((issue) => {
    const combinedText = `${issue.name} ${issue.message}`.toLowerCase();
    return combinedText.includes(searchTerm?.toLowerCase() || "");
  });

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
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan={4}>No issues found.</td>
            </tr>
          ) : (
            filteredItems.map((issue) => (
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
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.pageInfo}>
          Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}

export default IssueList;
