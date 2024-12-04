import { useQuery } from "@tanstack/react-query";
import { getAllIssues, getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

export const statusMapping: Record<string, string> = {
  resolved: "resolved", // User-facing "Resolved" maps to API "resolved"
  unresolved: "open", // User-facing "Unresolved" maps to API "open"
};

export const reverseStatusMapping: Record<string, string> = {
  resolved: "resolved", // API "resolved" maps back to "Resolved"
  open: "unresolved", // API "open" maps back to "Unresolved"
};

export function useGetIssues(
  page: number,
  searchTerm?: string,
  status?: string,
  level?: string,
  projectId?: string, // Add projectId as a parameter
) {
  // console.log("Parameters passed to useGetIssues:", {
  //   page,
  //   searchTerm,
  //   status,
  //   level,
  //   projectId,
  // });
  // Query Key: Determines caching and deduplication in React Query
  const queryKey =
    searchTerm || status || level || projectId
      ? ["issues", "all", searchTerm, status, level, projectId] // Filtering mode
      : ["issues", page]; // Pagination mode

  // Fetch Data: Decides whether to fetch paginated or filtered data
  const fetchData =
    searchTerm || status || level || projectId
      ? () => getAllIssues() // Fetch all items for client-side filtering
      : (options: { signal?: AbortSignal }) =>
          getIssues(page, options, searchTerm, status, level); // Paginated fetch

  // React Query Hook: Fetches and caches data
  const query = useQuery<Page<Issue>, Error>(
    queryKey,
    ({ signal }) => fetchData({ signal }), // Ensure options like `signal` are passed
    { keepPreviousData: true }, // Smooth pagination experience
  );

  // Items: Fetched from the API
  const items = query.data?.items || [];

  // Client-Side Filtering: Applies filters only if needed
  const filteredItems = items.filter((issue) => {
    const matchesSearch =
      !searchTerm ||
      `${issue.name} ${issue.message}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      !status || issue.status === reverseStatusMapping[status];
    const matchesLevel = !level || issue.level === level;
    const matchesProject = !projectId || issue.projectId === projectId;
    // console.log("Filtering issue:", {
    //   issue,
    //   matchesSearch,
    //   matchesStatus,
    //   matchesLevel,
    //   matchesProject,
    // });
    return matchesSearch && matchesStatus && matchesLevel && matchesProject; // Include matchesProject
  });

  // Total Pages: Calculate based on filtered results
  const totalPages = Math.ceil(filteredItems.length / 10);

  // Return Processed Data
  return {
    data: { items: filteredItems, meta: { totalPages } },
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
