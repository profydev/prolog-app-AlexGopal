import { useQuery } from "@tanstack/react-query";
import { getAllIssues, getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

export function useGetIssues(page: number, searchTerm?: string) {
  // Use the correct API call depending on whether a search term is provided
  const queryKey = searchTerm
    ? ["issues", "all", searchTerm]
    : ["issues", page];
  const fetchData = searchTerm
    ? () => getAllIssues() // Full database fetch if search term exists
    : (options: { signal?: AbortSignal }) => getIssues(page, options); // Paginated fetch if no search term

  // Trigger the API call with the appropriate fetch function
  const query = useQuery<Page<Issue>, Error>(
    queryKey,
    ({ signal }) => fetchData({ signal }),
    {
      keepPreviousData: true,
      enabled: page === 1 || !searchTerm, // Only trigger on page 1 when a search term is used
    },
  );

  const items = query.data?.items || [];

  // Filter items on the client if a search term is present
  const filteredItems = searchTerm
    ? items.filter((issue) =>
        `${issue.name} ${issue.message}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    : items;

  const totalPages = searchTerm
    ? Math.ceil(filteredItems.length / 10) // Total pages for filtered items
    : query.data?.meta?.totalPages || 1;

  return {
    data: { items: filteredItems, meta: { totalPages } },
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
