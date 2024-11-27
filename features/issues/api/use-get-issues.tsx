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
) {
  // console.log("useGetIssues - page:", page);
  // console.log("useGetIssues - searchTerm:", searchTerm);
  // console.log("useGetIssues - status (user-facing):", status);
  console.log("useGetIssues - level:", level);
  const queryKey =
    searchTerm || status || level
      ? ["issues", "all", searchTerm, status, level]
      : ["issues", page];
  console.log("useGetIssues - queryKey:", queryKey);
  const fetchData =
    searchTerm || status || level
      ? () => getAllIssues() // Fetch all items for filtering
      : (options: { signal?: AbortSignal }) => getIssues(page, options); // Paginated fetch for default view

  const query = useQuery<Page<Issue>, Error>(
    queryKey,
    ({ signal }) => fetchData({ signal }),
    { keepPreviousData: true },
  );

  const items = query.data?.items || [];
  // console.log("Fetched items (non-filtered):", items);

  // Only filter if searchTerm or status is active
  const filteredItems =
    searchTerm || status || level
      ? items.filter((issue) => {
          const matchesSearch =
            !searchTerm ||
            `${issue.name} ${issue.message}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          const mappedStatus = reverseStatusMapping[issue.status];
          const matchesStatus =
            !status || mappedStatus === reverseStatusMapping[status];
          const matchesLevel = !level || issue.level === level;
          return matchesSearch && matchesStatus && matchesLevel;
        })
      : items;

  const totalPages =
    searchTerm || status
      ? Math.ceil(filteredItems.length / 10)
      : query.data?.meta?.totalPages || 1;

  // console.log("Filtered items count:", filteredItems.length);
  // console.log("Total pages:", totalPages);

  return {
    data: { items: filteredItems, meta: { totalPages } },
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
