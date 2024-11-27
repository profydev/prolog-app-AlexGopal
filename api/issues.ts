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

import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";
import { statusMapping } from "../features/issues/api/use-get-issues";

const ENDPOINT = "/issue";
const PAGE_LIMIT = 10; // For the default view, only fetch 10 items per page

// Fetches paginated issues for a specific page
export async function getIssues(
  page: number,
  options?: { signal?: AbortSignal },
  searchTerm?: string,
  status?: string,
  level?: string,
) {
  // so this is the inital params object
  console.log("getIssues - received level:", level); // Add this
  console.log("getIssues function called"); // Add this
  const params: Record<string, string | number> = {
    page,
    limit: PAGE_LIMIT,
  };

  // apprently in javascript you can add  propties to a nobject dynamically by using the syntax
  // object.propertyName = value which is like doing
  // object["propertyName"] = value
  // If searchTerm or status is defined (not undefined, null, or false),
  // these lines dynamically create the searchTerm and status properties in the params object.

  if (searchTerm) params.searchTerm = searchTerm;
  if (status) params.status = statusMapping[status];
  console.log("getIssues - level:", level);
  if (level) params.level = level; // Add level to query

  console.log("API Request Params:", params); // Add this line to debug

  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params,
    ...options,
  });

  /*
  if searchTerm and status are provided params wil look like this as an exmaple
  params = {
  page: 1,
  limit: 10,
  searchTerm: "error",
  status: "resolved",
  };
  */
  return data;
}
