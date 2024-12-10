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
  projectId?: string,
) {
  const isFiltered = Boolean(searchTerm || status || level || projectId);

  const queryKey = isFiltered
    ? ["issues", "all", searchTerm, status, level, projectId]
    : ["issues", page];

  const fetchData = isFiltered
    ? () => getAllIssues()
    : (options: { signal?: AbortSignal }) =>
        getIssues(page, options, searchTerm, status, level, projectId);

  const query = useQuery<Page<Issue>, Error>(
    queryKey,
    ({ signal }) => fetchData({ signal }),
    { keepPreviousData: true },
  );

  // Log the received metadata and data
  console.log("useGetIssues - Query Data:", query.data);
  console.log("useGetIssues - Meta:", query.data?.meta);
  console.log("useGetIssues - IsFiltered:", isFiltered);

  const items = query.data?.items || [];

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

    return matchesSearch && matchesStatus && matchesLevel && matchesProject;
  });

  const totalPages = isFiltered
    ? Math.ceil(filteredItems.length / 10)
    : // use query.data instead of meta.data or sometimes the other side of the or statement may default to 1
      // if you dont you rely on meta from an early destructing which may cause an issue
      query.data?.meta?.totalPages || 1;

  return {
    data: { items: filteredItems, meta: { totalPages } },
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
