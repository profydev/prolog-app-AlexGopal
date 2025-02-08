import { useQuery } from "@tanstack/react-query";
import { getAllIssues, getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

export function useGetIssues(
  page: number,
  searchTerm?: string,
  status?: string,
  level?: string,
  projectId?: string,
) {
  const isFiltered = Boolean(searchTerm || status || level || projectId);

  const queryKey = isFiltered
    ? ["issues", searchTerm, status, level, projectId] // ✅ Removed "all"
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

    const matchesStatus = !status || issue.status === status; // ✅ Fixed filtering logic
    // dont neeed to convert open back to unresolved, we want to check if open == open because the api
    // is looking for open
    const matchesLevel = !level || issue.level === level;
    const matchesProject = projectId ? issue.projectId === projectId : true; // ✅ Fixed project filtering

    return matchesSearch && matchesStatus && matchesLevel && matchesProject;
  });

  const totalPages = isFiltered
    ? Math.ceil(filteredItems.length / 10)
    : query.data?.meta?.totalPages || 1;

  return {
    data: { items: filteredItems, meta: { totalPages } },
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
