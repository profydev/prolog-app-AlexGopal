// import { useQuery } from "@tanstack/react-query";
// import { getAllIssues, getIssues } from "@api/issues";
// import type { Page } from "@typings/page.types";
// import type { Issue } from "@api/issues.types";

// export function useGetIssues(page: number, searchTerm?: string) {
//   // Use the correct API call depending on whether a search term is provided
//   const queryKey = searchTerm
//     ? ["issues", "all", searchTerm]
//     : ["issues", page];
//   const fetchData = searchTerm
//     ? () => getAllIssues() // Full database fetch if search term exists
//     : (options: { signal?: AbortSignal }) => getIssues(page, options); // Paginated fetch if no search term

//   // Trigger the API call with the appropriate fetch function
//   const query = useQuery<Page<Issue>, Error>(
//     queryKey,
//     ({ signal }) => fetchData({ signal }),
//     {
//       keepPreviousData: true,
//       enabled: page === 1 || !searchTerm, // Only trigger on page 1 when a search term is used
//     },
//   );

//   const items = query.data?.items || [];

//   // Filter items on the client if a search term is present
//   const filteredItems = searchTerm
//     ? items.filter((issue) =>
//         `${issue.name} ${issue.message}`
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()),
//       )
//     : items;

//   const totalPages = searchTerm
//     ? Math.ceil(filteredItems.length / 10) // Total pages for filtered items
//     : query.data?.meta?.totalPages || 1;

//   return {
//     data: { items: filteredItems, meta: { totalPages } },
//     isLoading: query.isLoading,
//     isError: query.isError,
//   };
// }

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
) {
  console.log("useGetIssues - page:", page);
  console.log("useGetIssues - searchTerm:", searchTerm);
  console.log("useGetIssues - status (user-facing):", status);

  const queryKey =
    searchTerm || status
      ? ["issues", "all", searchTerm, status]
      : ["issues", page];
  const fetchData =
    searchTerm || status
      ? () => getAllIssues() // Fetch all items for filtering
      : (options: { signal?: AbortSignal }) => getIssues(page, options); // Paginated fetch for default view

  const query = useQuery<Page<Issue>, Error>(
    queryKey,
    ({ signal }) => fetchData({ signal }),
    { keepPreviousData: true },
  );

  const items = query.data?.items || [];
  console.log("Fetched items (non-filtered):", items);

  // Only filter if searchTerm or status is active
  const filteredItems =
    searchTerm || status
      ? items.filter((issue) => {
          const matchesSearch =
            !searchTerm ||
            `${issue.name} ${issue.message}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          const mappedStatus = reverseStatusMapping[issue.status];
          const matchesStatus =
            !status || mappedStatus === reverseStatusMapping[status];
          return matchesSearch && matchesStatus;
        })
      : items;

  const totalPages =
    searchTerm || status
      ? Math.ceil(filteredItems.length / 10)
      : query.data?.meta?.totalPages || 1;

  console.log("Filtered items count:", filteredItems.length);
  console.log("Total pages:", totalPages);

  return {
    data: { items: filteredItems, meta: { totalPages } },
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
