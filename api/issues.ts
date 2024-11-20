import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";
const PAGE_LIMIT = 10; // For the default view, only fetch 10 items per page

// Fetches paginated issues for specific page (default view)
export async function getIssues(
  page: number,
  options?: { signal?: AbortSignal },
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, limit: PAGE_LIMIT },
    ...options,
  });
  return data;
}

// Fetches all issues across multiple pages for filtering (filtered view)
export async function getAllIssues(options?: { signal?: AbortSignal }) {
  let allItems: Issue[] = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
      params: { page: currentPage, limit: 50 }, // Fetch larger pages to reduce calls
      ...options,
    });

    allItems = [...allItems, ...data.items];

    hasMore = currentPage < (data.meta?.totalPages || 0);
    currentPage += 1;
  }

  return {
    items: allItems,
    meta: {
      totalPages: Math.ceil(allItems.length / PAGE_LIMIT),
      currentPage: 1,
      limit: PAGE_LIMIT,
      totalItems: allItems.length,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  };
}
