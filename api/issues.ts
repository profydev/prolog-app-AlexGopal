// import { axios } from "./axios";
// import type { Issue } from "./issues.types";
// import type { Page } from "@typings/page.types";

// const ENDPOINT = "/issue";

// export async function getIssues(
//   page: number,
//   options?: { signal?: AbortSignal },
// ) {
//   const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
//     params: { page },
//     signal: options?.signal,
//   });
//   return data;
// }

import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  searchTerm?: string,
  status?: string,
  level?: string,
  project?: string,
  options?: { signal?: AbortSignal },
) {
  const params: {
    page: number;
    name?: string;
    status?: string;
    level?: string;
    project?: string;
  } = { page };

  if (searchTerm) params.name = searchTerm;
  if (status) params.status = status;
  if (level) params.level = level;
  if (project) params.project = project;

  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params,
    ...options, // Spread the options here to include the signal
  });
  return data;
}
