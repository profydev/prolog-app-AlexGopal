import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";
const PAGE_LIMIT = 10; // For the default view, only fetch 10 items per page

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

// Ensure statusMapping is used correctly
export const statusMapping: Record<string, string> = {
  resolved: "resolved",
  unresolved: "open",
};

export async function getIssues(
  page: number,
  options?: { signal?: AbortSignal },
  searchTerm?: string,
  status?: string,
  level?: string,
  projectId?: string,
) {
  const params: Record<string, string | number> = {
    page,
    limit: PAGE_LIMIT,
  };

  if (searchTerm) params.searchTerm = searchTerm;
  if (status) params.status = statusMapping[status]; // ✅ Fixed mapping issue
  // this is so we dont pass status as a string need to pass open not unresolved to the api
  if (level) params.level = level;
  if (projectId) params.projectId = projectId;

  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params,
    ...options,
  });

  console.log("API Response Meta:", data.meta);
  console.log("Fetched Items:", data.items);

  return data;
}
