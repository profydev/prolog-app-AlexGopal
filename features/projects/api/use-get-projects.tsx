// import { useQuery } from "@tanstack/react-query";
// import { getProjects } from "@api/projects";
// import type { Project } from "@api/projects.types";

// export function useGetProjects() {
//   return useQuery<Project[], Error>(["projects"], getProjects);
// }

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@api/projects";
import type { Project } from "@api/projects.types";

export function useGetProjects() {
  const query = useQuery<Project[], Error>(["projects"], getProjects);

  return {
    ...query,
    refetch: query.refetch,
  };
}
