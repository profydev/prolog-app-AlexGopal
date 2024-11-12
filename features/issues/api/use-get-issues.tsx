// import { useEffect } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getIssues } from "@api/issues";
// import type { Page } from "@typings/page.types";
// import type { Issue } from "@api/issues.types";

// const QUERY_KEY = "issues";

// export function getQueryKey(page?: number) {
//   if (page === undefined) {
//     return [QUERY_KEY];
//   }
//   return [QUERY_KEY, page];
// }

// export function useGetIssues(page: number) {
//   const query = useQuery<Page<Issue>, Error>(
//     getQueryKey(page),
//     ({ signal }) => getIssues(page, { signal }),
//     { keepPreviousData: true },
//   );

//   // Prefetch the next page!
//   const queryClient = useQueryClient();
//   useEffect(() => {
//     if (query.data?.meta.hasNextPage) {
//       queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
//         getIssues(page + 1, { signal }),
//       );
//     }
//   }, [query.data, page, queryClient]);
//   return query;
// }

// import { useEffect } from "react"; // Import useEffect here
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getIssues } from "@api/issues";
// import type { Page } from "@typings/page.types";
// import type { Issue } from "@api/issues.types";

// const QUERY_KEY = "issues";

// export function getQueryKey(page?: number, searchTerm?: string) {
//   return searchTerm ? [QUERY_KEY, page, searchTerm] : [QUERY_KEY, page];
// }

// export function useGetIssues(page: number, searchTerm?: string) {
//   const query = useQuery<Page<Issue>, Error>(
//     getQueryKey(page, searchTerm),
//     ({ signal }) =>
//       getIssues(page, searchTerm, undefined, undefined, undefined, { signal }), // Adjusted call to match new getIssues structure
//     { keepPreviousData: true },
//   );

//   const queryClient = useQueryClient();
//   useEffect(() => {
//     if (query.data?.meta.hasNextPage) {
//       queryClient.prefetchQuery(
//         getQueryKey(page + 1, searchTerm),
//         ({ signal }) =>
//           getIssues(page + 1, searchTerm, undefined, undefined, undefined, {
//             signal,
//           }),
//       );
//     }
//   }, [query.data, page, queryClient, searchTerm]);

//   console.log("API response for searchTerm:", searchTerm, query.data);
//   return query;
// }

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
